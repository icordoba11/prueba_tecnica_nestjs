import { Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

export class AuditEntity {
  @CreateDateColumn()
  fecha_creacion!: Date;

  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @Column({ nullable: true })
  creado_por_id?: string;

  @Column({ nullable: true })
  actualizado_por_id?: string;

}
