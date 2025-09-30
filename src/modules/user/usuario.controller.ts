import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './usuario.service';
import { CreateUserDto } from './dto/crear.dto';
import { UpdateUserDto } from './dto/actualizar.dto';
import { Usuario } from './usuario.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    create(@Body() dto: CreateUserDto): Promise<Usuario> {
        return this.userService.create(dto);
    }

    @Get()
    findAll(): Promise<Usuario[]> {
        return this.userService.findAll();
    }


    @Get(':uuid')
    findOne(@Param('uuid') id: string): Promise<Usuario> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<Usuario> {
        return this.userService.update(id, dto);
    }

    // Eliminar usuario
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
