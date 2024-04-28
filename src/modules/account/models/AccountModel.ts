import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'

@Entity('Account')
export class AccountModel extends SoftDeleteBaseModel {
  constructor (params?: Partial<AccountModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
    length: 100,
  })
  nome: string

  @Column({
    type: String,
    nullable: true,
    default: null,
    length: 100,
  })
  @Index('IDX_account_email', { unique: true })
  email: string

  @Column({ length: 255, nullable: true })
  password: string
}
