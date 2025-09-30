import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'defaultSecret',
        });
    }

    async validate(payload: any) {
        // Verifica que sea un token de acceso
        if (payload.type !== 'access') {
            throw new UnauthorizedException('Invalid token type');
        }

        // Verifica que el usuario aún existe
        const user = await this.userService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            userId: payload.sub,
            email: payload.email,
            nombre: payload.nombre,
            apellido: payload.apellido,
        };
    }
}