import { ApiProperty } from '@nestjs/swagger'

import { IsArray, IsDefined, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

import { UdeModel } from '@/emergency/models/UdeModel'
import { SensorResponse } from '@/emergency/structures/responses/SensorResponse'
import { ZonaResponse } from '@/emergency/structures/responses/ZonaResponse'

export class UdeResponse {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Identificador da UDE', example: 1 })
  id: number

  @IsDefined()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Rótulo da UDE', required: false, maxLength: 50, example: 'BPC01' })
  label?: string

  @IsDefined()
  @IsString()
  @MaxLength(17)
  @ApiProperty({ description: 'Endereço MAC da UDE', maxLength: 17, example: '00:00:00:00:00:00' })
  mac: string

  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Latitude da UDE', example: -12.198102 })
  latitude: number

  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Longitude da UDE', example: -38.9727037 })
  longitude: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Raio de operação da UDE', required: false, example: 100 })
  operatingRange?: number

  @IsOptional()
  @ApiProperty({ description: 'Zona de atuação da UDE', required: false, type: ZonaResponse })
  zona?: ZonaResponse

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'Sensores da UDE', type: [SensorResponse] })
  sensores: SensorResponse[]

  static toResponse(model: UdeModel): UdeResponse {
    return {
      id: model.id,
      label: model.label,
      mac: model.mac,
      latitude: model.latitude,
      longitude: model.longitude,
      operatingRange: model.operatingRange,
      zona: model.zona && ZonaResponse.toResponse(model.zona),
      sensores: (model.sensores || []).map((sensor) => SensorResponse.toResponse(sensor)),
    }
  }
}
