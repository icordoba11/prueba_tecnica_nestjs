// auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';
import { UserService } from '../user/usuario.service';
import { AuthResponse, JwtPayload } from 'src/types/auth';
import { Usuario } from '../user/usuario.entity';




@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, contrasena } = loginDto;

    const user = await this.userService.findLoginEmail(email);

    await this.userService.validatePassword(user, contrasena);

    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
      ...tokens,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, contrasena, nombre, apellido } = registerDto;

    await this.userService.findRegisterEmail(email);

    const user = await this.userService.create({
      email,
      contrasena,
      nombre,
      apellido,
    });

    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
      ...tokens,
    };
  }

  async refreshToken(tokenRefresco: string): Promise<{ tokenAcceso: string; tokenRefresco: string }> {
    try {
      const payload = this.jwtService.verify(tokenRefresco, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: Usuario): Promise<{ tokenAcceso: string; tokenRefresco: string }> {
    const payload: Omit<JwtPayload, 'tipo'> = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
    };

    const [tokenAcceso, tokenRefresco] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload, type: 'access' },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
        },
      ),
      this.jwtService.signAsync(
        { ...payload, type: 'refresh' },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        },
      ),
    ]);

    return {
      tokenAcceso,
      tokenRefresco,
    };
  }

  async validateToken(token: string): Promise<Usuario> {
    try {
      const payload = this.jwtService.verify<{ sub: string; email: string }>(token);
      const user = await this.userService.findOne(payload.sub);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}