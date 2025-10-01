import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { FacturaDetalle } from './entities/factura-detalle.entity';
import { AgregarFacturaDetalleDto } from './dto/agregar-detalle.dto';


@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(FacturaDetalle)
    private readonly facturaDetalleRepository: Repository<FacturaDetalle>,
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
    addDetailDto: AgregarFacturaDetalleDto,
  ): Promise<FacturaDetalle> {

    const factura = await this.facturaRepository.findOne({
      where: { id: facturaId },
    });

    if (!factura) {
      throw new NotFoundException(`Factura con id ${facturaId} no encontrada`);
    }

    const subtotal = addDetailDto.cantidad * addDetailDto.precioUnitario;

    const nuevoDetalle = this.facturaDetalleRepository.create({
      ...addDetailDto,
      subtotal,
      factura: factura
    });

    const detalleGuardado = await this.facturaDetalleRepository.save(nuevoDetalle);

    factura.total = Number(factura.total) + subtotal;
    await this.facturaRepository.save(factura);

    return detalleGuardado;
  }

  async findAll(): Promise<Factura[]> {
    return this.facturaRepository.find({ relations: ['detalles'] });
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne(
      {
        where: { id },
        relations: ['detalles']
      });
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
