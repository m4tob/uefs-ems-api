import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseModel {
  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date
}
