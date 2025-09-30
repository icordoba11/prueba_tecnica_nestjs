import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

}

