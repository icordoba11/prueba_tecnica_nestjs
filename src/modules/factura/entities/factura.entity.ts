import { AuditEntity } from "src/common/audity.entity";
import { FacturaDetalle } from "src/modules/factura-detalle/entities/factura-detalle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factura extends AuditEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cliente: string;

    @Column()
    fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @OneToMany(() => FacturaDetalle, detalle => detalle.factura, {
        cascade: true,
        eager: true
    })
    detalles: FacturaDetalle[];


}
