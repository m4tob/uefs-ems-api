import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'
import { DeteccaoEmergenciaModel } from '@/emergency/models/DeteccaoEmergenciaModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'

@Entity('monitoramento_grandeza')
export class MonitoramentoGrandezaModel extends SoftDeleteBaseModel {
  constructor(params?: Partial<MonitoramentoGrandezaModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'deteccao_emergencia_id', nullable: true })
  deteccaoEmergenciaId: number

  @ManyToOne(() => DeteccaoEmergenciaModel, (model) => model.id)
  @JoinColumn({ name: 'deteccao_emergencia_id' })
  deteccaoEmergencia?: DeteccaoEmergenciaModel

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

  @Column({ name: 'threshold_minimo', type: 'decimal', precision: 8, scale: 3, nullable: true })
  thresholdMinimo?: number

  @Column({ name: 'threshold_maximo', type: 'decimal', precision: 8, scale: 3, nullable: true })
  thresholdMaximo?: number

  @Column({ type: 'boolean', nullable: true })
  ativo?: Boolean
}
