import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/crear.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/actualizar.dto';
import { Usuario } from './usuario.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuario)
        private userRepository: Repository<Usuario>,
    ) { }

    async create(dto: CreateUserDto): Promise<Usuario> {
        const { contrasena, ...rest } = dto;

        const user = this.userRepository.create({
            ...rest,
            contrasena: await bcrypt.hash(contrasena, 10),
        });

        return this.userRepository.save(user);
    }

    async findAll(): Promise<Usuario[]> {
        return this.userRepository.find();
    }


    async findOne(id: string): Promise<Usuario> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`Usuario not found`);
        }
        return user;
    }

    async update(id: string, dto: UpdateUserDto): Promise<Usuario> {
        const user = await this.findOne(id);

        if (dto.contrasena) {
            dto.contrasena = await bcrypt.hash(dto.contrasena, 10);
        }

        Object.assign(user, dto);

        return this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }

    //--------------------Metodos llamado desde auth-------------------------
    
    async findRegisterEmail(email: string): Promise<Usuario | null> {

        const user = await this.userRepository.findOneBy({ email });

        if (user) {
            throw new ConflictException('El correo ya está registrado!');
        }
        return user;
    }

    async findLoginEmail(email: string): Promise<Usuario> {

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new NotFoundException('El correo no existe!');
        }
        return user;
    }

    async findOneByPass(contrasena: string): Promise<Usuario> {
        try {
            const pass = await this.userRepository.findOneBy({ contrasena });
            if (!pass) {
                throw new NotFoundException(`Wrong password`);
            }
            return pass;
        } catch (error) {
            throw error;
        }
    }

    async validatePassword(usuario: Usuario, contrasenaPlana: string): Promise<void> {
        const isValid = await bcrypt.compare(contrasenaPlana, usuario.contrasena);
        if (!isValid) throw new UnauthorizedException('Credenciales incorrectas');
    }


}
