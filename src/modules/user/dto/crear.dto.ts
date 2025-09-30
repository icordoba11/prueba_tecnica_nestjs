import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

}
