import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @ApiProperty({ example: 'string', description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiProperty({ example: 'string', description: 'Apellido del usuario' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @ApiProperty({ example: 'string', description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  email: string;

  @ApiProperty({ example: 'string', description: 'Contraseña del usuario' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

}

