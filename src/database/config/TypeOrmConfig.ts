import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { Environment as envs } from '@/Environment'
import { AccountModel } from '@/account/models/AccountModel'
import { DeteccaoEmergenciaModel } from '@/emergency/models/DeteccaoEmergenciaModel'
import { EspecificacaoGrandezaModel } from '@/emergency/models/EspecificacaoGrandezaModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { MonitoramentoGrandezaModel } from '@/emergency/models/MonitoramentoGrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'
import { UdeModel } from '@/emergency/models/UdeModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'
import { RegistroMonitoramentoModel } from '@/emergency/models/RegistroMonitoramentoModel'

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
    SensorModel,
    EspecificacaoGrandezaModel,
    ZonaModel,
    UdeModel,
    DeteccaoEmergenciaModel,
    MonitoramentoGrandezaModel,
    RegistroMonitoramentoModel,
  ],
  bigNumberStrings: false,
  timezone: '+00:00',
} as TypeOrmModuleOptions
