import { createConnection } from 'typeorm'

import { Environment as envs } from '@/Environment'


(async () => {
  try {
    const connection = await createConnection({
      type: 'mysql',

      host: envs.DB_HOSTNAME,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
    })

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${envs.DB_DATABASE}`)

    await connection.close()

    console.log('Database setup completed')
  } catch (error) {
    console.log(error)
  }
})()
