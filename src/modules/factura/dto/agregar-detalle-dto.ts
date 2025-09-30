// src/modules/factura-detalle/dto/create-factura-detalle.dto.ts
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class AgregarDetalleDto {
  @IsNumber()
  factura_id: number;

  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @IsNumber()
  @Min(0)
  subtotal: number;
}
