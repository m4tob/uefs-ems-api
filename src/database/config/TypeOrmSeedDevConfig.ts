/* eslint-disable import/first */
/* eslint-disable import-helpers/order-imports */
import dotenv from 'dotenv'
dotenv.config()

import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

import TypeOrmConfig from '@/database/config/TypeOrmConfig'

export default new DataSource({
  ...(TypeOrmConfig as DataSourceOptions),
  migrationsTableName: 'Seed',
  migrations: [
    join(__dirname, '..', 'seedsDev', '*{.ts,.js}')
  ],
})
