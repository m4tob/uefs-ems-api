/* eslint-disable import/first */
/* eslint-disable import-helpers/order-imports */
import dotenv from 'dotenv'
dotenv.config()

import { Environment as envs } from '@/Environment'
envs.validate()

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'

import { AppModule } from '@/AppModule'
import { AllExceptionFilter } from '@/core/helpers/AllExceptionFilter'
import { ResponseTransformInterceptor } from '@/core/helpers/ResponseTransformInterceptor'

import { SentryConfig } from '@/config/SentryConfig'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import { initializeTransactionalContext } from 'typeorm-transactional'

const configureSwagger = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Emergency Management System - API')
    .setDescription('Emergency Management System - API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
      'Role Access Token'
    )
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap () {
  Sentry.init(SentryConfig)
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)

  configureSwagger(app)

  app.use(helmet())

  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.enableCors({ optionsSuccessStatus: 200 })
  app.enableShutdownHooks()
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  // app.enableVersioning({ type: VersioningType.URI });

  await app.listen(envs.PORT)
}

bootstrap()
