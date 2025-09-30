import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './crear.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
