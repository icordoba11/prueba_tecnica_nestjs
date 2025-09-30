import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { FacturaDetalleModule } from '../factura-detalle/factura-detalle.module';

@Module({
  imports: [TypeOrmModule.forFeature([Factura]), FacturaDetalleModule],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule { }
