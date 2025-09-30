import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { AgregarDetalleDto } from './dto/agregar-detalle-dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) { }

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    return this.facturaService.create(createFacturaDto, userId);
  }

  @Post(':id/detalle')
  addDetail(
    @Param('id') facturaId: number,
    @Body() addDetailDto: AgregarDetalleDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    return this.facturaService.addDetail(facturaId, addDetailDto, userId);
  }

  @Get()
  findAll() {
    return this.facturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facturaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facturaService.remove(id);
  }
}
