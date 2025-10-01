import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./factura.entity";

@Entity('factura_detalle')
export class FacturaDetalle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Factura, factura => factura.detalles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'factura_id' })
    factura: Factura;

    @Column()
    producto: string;

    @Column()
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio_unitario' })
    precioUnitario: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;


}