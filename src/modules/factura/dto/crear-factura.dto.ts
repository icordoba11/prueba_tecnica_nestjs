import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AgregarDetalleDto } from "./agregar-detalle-dto";


export class CreateFacturaDto {

    @IsString()
    @IsNotEmpty()
    cliente: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AgregarDetalleDto)
    detalles: AgregarDetalleDto[];
}
