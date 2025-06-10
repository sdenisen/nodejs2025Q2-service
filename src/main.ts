import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const readApiYaml = async () => {
  const dstPath = resolve(__dirname, '..', 'doc', 'api.yaml');
  return await readFile(dstPath, 'utf-8');
};

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const apiConfig = await readApiYaml();
  const document = load(apiConfig) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, document);

  await app.listen(PORT);
}
bootstrap();
