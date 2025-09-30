import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './usuario.service';
import { CreateUserDto } from './dto/crear.dto';
import { UpdateUserDto } from './dto/actualizar.dto';
import { Usuario } from './usuario.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Crear usuario', description: 'Crea un nuevo usuario en el sistema' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
    create(@Body() dto: CreateUserDto): Promise<Usuario> {
        return this.userService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar usuarios', description: 'Obtiene todos los usuarios registrados' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta correctamente.' })
    findAll(): Promise<Usuario[]> {
        return this.userService.findAll();
    }


    @Get(':uuid')
    @ApiOperation({ summary: 'Obtener usuario por UUID', description: 'Obtiene un usuario específico por su UUID' })
    @ApiParam({ name: 'uuid', description: 'UUID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    findOne(@Param('uuid') id: string): Promise<Usuario> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar usuario', description: 'Actualiza los datos de un usuario existente' })
    @ApiParam({ name: 'id', description: 'UUID del usuario' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<Usuario> {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina un usuario del sistema' })
    @ApiParam({ name: 'id', description: 'UUID del usuario', })
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
