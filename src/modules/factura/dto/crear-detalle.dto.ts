import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CrearDetalleDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Producto A' })
  @IsString()
  @IsNotEmpty()
  producto: string;

  @ApiProperty({ description: 'Cantidad del producto', example: 2, minimum: 1 })
  @IsNumber()
  @Min(1, { message: 'La cantidad no puede ser menor que 1' })
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0, { message: 'El precio unitario no puede ser negativo' })
  precioUnitario: number;
}
