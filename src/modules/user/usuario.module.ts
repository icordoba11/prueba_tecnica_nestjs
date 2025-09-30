import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './usuario.service';
import { UserController } from './usuario.controller';
import { Usuario } from './usuario.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
