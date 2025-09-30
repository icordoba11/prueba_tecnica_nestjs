import { Module } from '@nestjs/common';
import { FacturaDetalleService } from './factura-detalle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaDetalle } from './entities/factura-detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacturaDetalle])],
  controllers: [],
  providers: [FacturaDetalleService],
  exports: [FacturaDetalleService]
})
export class FacturaDetalleModule { }
