// src/modules/factura-detalle/dto/create-factura-detalle.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class AgregarDetalleDto {
  @IsNumber()
  factura_id: number;

  @ApiProperty({ description: 'Nombre del producto', example: 'Producto A' })
  @IsString()
  @IsNotEmpty()
  producto: string;

  @ApiProperty({ description: 'Cantidad del producto', example: 2, minimum: 1 })
  @IsNumber()
  @Min(1)
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @ApiProperty({ description: 'Subtotal calculado del detalle', example: 200, minimum: 0 })
  @IsNumber()
  @Min(0)
  subtotal: number;
}
