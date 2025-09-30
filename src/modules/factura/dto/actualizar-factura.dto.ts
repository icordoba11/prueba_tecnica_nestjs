import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturaDto } from './crear-factura.dto';

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {}
