import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { UpdateFacturaDto } from './dto/actualizar-factura.dto';
import { AgregarDetalleDto } from './dto/agregar-detalle-dto';
import { FacturaDetalleService } from '../factura-detalle/factura-detalle.service';
import { FacturaDetalle } from '../factura-detalle/entities/factura-detalle.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    private readonly facturaDetalleService: FacturaDetalleService,
  ) { }

  async create(createFacturaDto: CreateFacturaDto, userId: string): Promise<Factura> {

    const detalles = createFacturaDto.detalles.map(detalle => ({
      ...detalle,
      subtotal: detalle.cantidad * detalle.precioUnitario,
    }));

    const total = detalles.reduce((sum, d) => sum + d.subtotal, 0);

    const factura = this.facturaRepository.create({
      cliente: createFacturaDto.cliente,
      fecha: createFacturaDto.fecha,
      total,
      detalles,
      creado_por_id: userId,
      actualizado_por_id: userId
    });

    return this.facturaRepository.save(factura);
  }


  async addDetail(
    facturaId: number,
    addDetailDto: AgregarDetalleDto,
    userId: string
  ): Promise<FacturaDetalle> {
    const factura = await this.facturaRepository.findOne({ where: { id: facturaId } });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    return this.facturaDetalleService.create({
      ...addDetailDto,
      factura_id: facturaId,
    });
  }



  async findAll(): Promise<Factura[]> {
    return this.facturaRepository.find();
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({ where: { id } });
    if (!factura) {
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }
    return factura;
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura);
  }
}
