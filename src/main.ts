import 'dotenv/config'
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {configureSwagger} from "@/config/swagger.config";
import {ValidationPipe} from "@nestjs/common";
import morgan from "morgan";
import {join} from "path"
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({origin: '*'})
  configureSwagger(app);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  app.use(morgan('dev'))

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {prefix: '/uploads/'})
  await app.listen(3000, () => console.log('Server ishga tushmoqda...'));
}

bootstrap();
