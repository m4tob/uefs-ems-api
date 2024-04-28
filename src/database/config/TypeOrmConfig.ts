import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AccountModel } from '@/account/models/AccountModel'
import { Environment as envs } from '@/Environment'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'

export default {
  type: 'mysql',
  synchronize: false,
  migrationsRun: false,
  host: envs.DB_HOSTNAME,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_DATABASE,
  extra: {
    connectionLimit: envs.DB_CONNECTION_LIMIT,
  },
  logging: false,
  entities: [
    // Account Module
    AccountModel,

    // Emergency Module
    GrandezaModel,
    TipoEmergenciaModel,
  ],
  bigNumberStrings: false,
  timezone: '+00:00',
} as TypeOrmModuleOptions
