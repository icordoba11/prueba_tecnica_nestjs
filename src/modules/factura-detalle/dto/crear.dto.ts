import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CrearFacturaDetalleDto {
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
