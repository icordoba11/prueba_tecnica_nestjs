import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

import { ApiProperty } from "@nestjs/swagger";
import { CrearDetalleDto } from "./crear-detalle.dto";


export class CreateFacturaDto {
    @ApiProperty({ description: 'Nombre del cliente', example: 'string' })
    @IsString()
    @IsNotEmpty({ message: 'El campo cliente no puede estar vacio' })
    cliente: string;

    @ApiProperty({ description: 'Fecha de la factura', example: '2025-09-29' })
    @IsDateString({}, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    @IsNotEmpty({ message: 'La fecha es obligatoria' })
    fecha: string;

    @ApiProperty({
        description: 'Detalles de la factura',
        type: [CrearDetalleDto],
        minItems: 1,
        example: [
            { producto: 'string', cantidad: 2, precioUnitario: 100 },
            { producto: 'string', cantidad: 1, precioUnitario: 50 }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CrearDetalleDto)
    detalles: CrearDetalleDto[];
}
