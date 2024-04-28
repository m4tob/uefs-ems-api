import { Entity, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'

@Entity('sensor')
export class SensorModel extends SoftDeleteBaseModel {
  constructor (params?: Partial<SensorModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number
}
