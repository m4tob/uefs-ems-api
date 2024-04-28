import { Entity, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'

@Entity('edu')
export class EduModel extends SoftDeleteBaseModel {
  constructor (params?: Partial<EduModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number
}
