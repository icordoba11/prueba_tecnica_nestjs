
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/publico.decorator';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Registrar un usuario', description: 'Crea un usuario nuevo en el sistema' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login de usuario', description: 'Autentica un usuario y retorna un token' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
