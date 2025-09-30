import { MigrationInterface, QueryRunner } from "typeorm";

export class MiPrimerMigracion1759251795305 implements MigrationInterface {
    name = 'MiPrimerMigracion1759251795305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creado_por_id\` varchar(255) NULL, \`actualizado_por_id\` varchar(255) NULL, \`id\` varchar(36) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`contrasena\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`factura_detalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`factura_id\` int NOT NULL, \`producto\` varchar(255) NOT NULL, \`cantidad\` int NOT NULL, \`precio_unitario\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`factura\` (\`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creado_por_id\` varchar(255) NULL, \`actualizado_por_id\` varchar(255) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`cliente\` varchar(255) NOT NULL, \`fecha\` datetime NOT NULL, \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`factura_detalle\` ADD CONSTRAINT \`FK_91eb0ec9112241836620da50d28\` FOREIGN KEY (\`factura_id\`) REFERENCES \`factura\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`factura_detalle\` DROP FOREIGN KEY \`FK_91eb0ec9112241836620da50d28\``);
        await queryRunner.query(`DROP TABLE \`factura\``);
        await queryRunner.query(`DROP TABLE \`factura_detalle\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }

}
