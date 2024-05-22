import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'
import { ColumnNumericTransformer } from '@/core/repositories/ColumnNumericTransformer'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { UdeModel } from '@/emergency/models/UdeModel'

@Entity('registro_monitoramento')
export class RegistroMonitoramentoModel extends SoftDeleteBaseModel {
  constructor(params?: Partial<RegistroMonitoramentoModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'ude_id' })
  udeId: number

  @ManyToOne(() => UdeModel, (model) => model.id)
  @JoinColumn({ name: 'ude_id' })
  ude?: UdeModel

  @Column({ name: 'sensor_id' })
  sensorId: number

  @ManyToOne(() => SensorModel, (model) => model.id)
  @JoinColumn({ name: 'sensor_id' })
  sensor?: SensorModel

  @Column({ name: 'grandeza_id' })
  grandezaId: number

  @ManyToOne(() => GrandezaModel, (model) => model.id)
  @JoinColumn({ name: 'grandeza_id' })
  grandeza?: GrandezaModel

  @Column({
    name: 'valor',
    type: 'decimal',
    precision: 8,
    scale: 3,
    transformer: new ColumnNumericTransformer()
  })
  valor: number

  @Column({ name: 'data_coleta', type: 'timestamp' })
  dataColeta: Date
}
