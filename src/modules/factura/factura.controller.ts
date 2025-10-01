import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgregarFacturaDetalleDto } from './dto/agregar-detalle.dto';

@ApiBearerAuth('JWT-auth')
@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) { }

  @Post()
  @ApiOperation({ summary: 'Crear factura', description: 'Crea una nueva factura con detalles' })
  @ApiResponse({ status: 201, description: 'Factura creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
  create(@Body() createFacturaDto: CreateFacturaDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    return this.facturaService.create(createFacturaDto, userId);
  }

  @Post(':id/detalle')
  @ApiOperation({ summary: 'Agregar detalle a factura', description: 'Agrega un nuevo detalle a una factura existente' })
  @ApiResponse({ status: 200, description: 'Detalle agregado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
  addDetail(
    @Param('id') facturaId: number,
    @Body() addDetailDto: AgregarFacturaDetalleDto,
  ) {
    return this.facturaService.addDetail(facturaId, addDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las facturas' })
  @ApiResponse({ status: 200, description: 'Lista de facturas devuelta correctamente.' })
  findAll() {
    return this.facturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  findOne(@Param('id') id: number) {
    return this.facturaService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  remove(@Param('id') id: number) {
    return this.facturaService.remove(id);
  }
}
