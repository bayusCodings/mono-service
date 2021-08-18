import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { AppModule } from './app.module'
import { corsConfiguration } from './config/cors-configuration'
import dotenv from 'dotenv'
dotenv.config();

async function bootstrap () {
  const cors: CorsOptions = corsConfiguration
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.disable('x-powered-by')
  app.enableCors(cors)

  const options = new DocumentBuilder()
    .setTitle('Mono Service API')
    .setDescription('API documentation for the Mono Service API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs/', app, document)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableShutdownHooks()
  await app.listen(process.env.PORT || 8080, () => {
    (new Logger()).log(`Mono api is started on PORT ${process.env.PORT || 8080}....`)
  })
}
bootstrap()
