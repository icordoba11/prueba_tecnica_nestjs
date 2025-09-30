import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AgregarDetalleDto } from "./agregar-detalle-dto";
import { ApiProperty } from "@nestjs/swagger";


export class CreateFacturaDto {
    @ApiProperty({ description: 'Nombre del cliente', example: 'string' })
    @IsString()
    @IsNotEmpty()
    cliente: string;

    @ApiProperty({ description: 'Fecha de la factura', example: '2025-09-29' })
    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @ApiProperty({
        description: 'Detalles de la factura',
        type: [AgregarDetalleDto],
        minItems: 1,
        example: [
            { producto: 'string', cantidad: 2, precio: 100 },
            { producto: 'string', cantidad: 1, precio: 50 }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AgregarDetalleDto)
    detalles: AgregarDetalleDto[];
}
