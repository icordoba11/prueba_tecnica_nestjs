import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Factura } from './src/modules/factura/entities/factura.entity';
import { FacturaDetalle } from './src/modules/factura-detalle/entities/factura-detalle.entity';

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
