import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

}
