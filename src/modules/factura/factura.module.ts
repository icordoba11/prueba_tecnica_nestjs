import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { FacturaDetalle } from './entities/factura-detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, FacturaDetalle])],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule { }
