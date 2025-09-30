import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  
  app.useGlobalGuards(app.get(JwtAuthGuard));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Listening on port ->  ${process.env.PORT}`)

}
bootstrap();
