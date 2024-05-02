import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { TipoSinalEnum } from '@/emergency/structures/enum/TipoSinalEnum'

@Entity('especificacao_grandeza')
export class EspecificacaoGrandezaModel extends SoftDeleteBaseModel {
  constructor(params?: Partial<EspecificacaoGrandezaModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sensorId: number

  @ManyToOne(() => SensorModel, (model) => model.especificacoes, { onDelete: 'CASCADE' })
  sensor?: SensorModel

  @Column()
  grandezaId: number

  @ManyToOne(() => GrandezaModel, (model) => model.id)
  @JoinColumn()
  grandeza?: GrandezaModel

  @Column({ type: 'decimal', precision: 8, scale: 3, nullable: true })
  valorMinimo?: number

  @Column({ type: 'decimal', precision: 8, scale: 3, nullable: true })
  valorMaximo?: number

  @Column({ type: 'varchar', length: 15, nullable: true })
  sinal?: TipoSinalEnum
}
