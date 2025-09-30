import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaDetalle } from './entities/factura-detalle.entity';
import { Repository } from 'typeorm';
import { CrearFacturaDetalleDto } from './dto/crear.dto';


@Injectable()
export class FacturaDetalleService {
    constructor(
        @InjectRepository(FacturaDetalle)
        private readonly facturaDetalleRepository: Repository<FacturaDetalle>,
    ) { }


    async create(createFacturaDetalleDto: CrearFacturaDetalleDto): Promise<FacturaDetalle> {
        const detalle = this.facturaDetalleRepository.create(createFacturaDetalleDto);
        return this.facturaDetalleRepository.save(detalle);
    }
}
