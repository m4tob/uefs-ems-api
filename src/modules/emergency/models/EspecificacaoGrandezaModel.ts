import { Entity, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'

@Entity('especificacao_grandeza')
export class EspecificacaoGrandezaModel extends SoftDeleteBaseModel {
  constructor (params?: Partial<EspecificacaoGrandezaModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number
}
