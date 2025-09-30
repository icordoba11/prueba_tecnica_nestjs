import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuditEntity } from 'src/common/audit.entity';

@Entity('usuario')
export class Usuario extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    email: string;

    @Column()
    contrasena: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.contrasena && !this.contrasena.startsWith('$2b$')) {
            const saltRounds = 10;
            this.contrasena = await bcrypt.hash(this.contrasena, saltRounds);
        }
    }

}
