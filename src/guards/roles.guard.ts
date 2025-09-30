// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from 'src/modules/auth/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) { }

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       throw new ForbiddenException('Usuario no autenticado');
//     }

//     if (!user.roleValue) {
//       throw new ForbiddenException('Usuario sin rol asignado');
//     }

//     const hasRole = requiredRoles.includes(user.roleValue);

//     if (!hasRole) {
//       throw new ForbiddenException(
//         `Acceso denegado`
//       );
//     }

//     return true;
//   }
// }