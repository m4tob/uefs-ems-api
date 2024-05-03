import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SoftDeleteBaseModel } from '@/core/models/SoftDeleteBaseModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'

@Entity('ude')
export class UdeModel extends SoftDeleteBaseModel {
  constructor(params?: Partial<UdeModel>) {
    super()
    Object.assign(this, params)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  label?: string

  @Column({ length: 17 })
  @Index()
  mac: string

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number

  @Column({ name: 'operating_range', type: 'decimal', precision: 8, scale: 2, nullable: true })
  operatingRange?: number

  @Column({ name: 'zona_id' })
  zonaId: number

  @ManyToOne(() => ZonaModel, (model) => model.id)
  @JoinColumn({ name: 'zona_id' })
  zona?: ZonaModel

  @ManyToMany(() => SensorModel, (model) => model.udes)
  @JoinTable({
    name: 'ude_x_sensor',
    joinColumn: { name: 'ude_id' },
    inverseJoinColumn: { name: 'sensor_id' }
  })
  sensores: SensorModel[]
}
