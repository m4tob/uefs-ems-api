import { ApiProperty } from '@nestjs/swagger'

import { IsArray, IsBoolean, IsDefined, IsNumber, IsOptional } from 'class-validator'

import { DeteccaoEmergenciaModel } from '@/emergency/models/DeteccaoEmergenciaModel'
import { GrandezaResponse } from '@/emergency/structures/responses/GrandezaResponse'
import { SensorResponse } from '@/emergency/structures/responses/SensorResponse'
import { TipoEmergenciaResponse } from '@/emergency/structures/responses/TipoEmergenciaResponse'

export class MonitoramentoGrandezaResponse {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Identificador do Monitoramento de Grandeza', example: 1 })
  id: number

  @IsDefined()
  @ApiProperty({ description: 'Sensor responsável pelo monitoramento', type: SensorResponse })
  sensor: SensorResponse

  @IsDefined()
  @ApiProperty({ description: 'Grandeza monitorada', type: GrandezaResponse })
  grandeza: GrandezaResponse

  @IsOptional()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 3 })
  @ApiProperty({ description: 'Threshold Mínimo', required: false, example: 20.0 })
  thresholdMinimo?: number

  @IsOptional()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 3 })
  @ApiProperty({ description: 'Threshold Máximo', required: false, example: 60.0 })
  thresholdMaximo?: number

  @IsDefined()
  @IsBoolean()
  @ApiProperty({ description: 'Indica se a detecção está ativa', example: true })
  ativo?: Boolean
}

export class DeteccaoEmergenciaResponse {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Identificador da Configuração de Detecção de Emergência', example: 1 })
  id: number

  @IsDefined()
  @ApiProperty({ description: 'Tipo de Emergência monitorada', type: TipoEmergenciaResponse })
  tipoEmergencia: TipoEmergenciaResponse

  @IsDefined()
  @IsArray()
  @ApiProperty({ description: 'Monitoramentos de Grandeza', type: [MonitoramentoGrandezaResponse] })
  monitoramentos: MonitoramentoGrandezaResponse[]

  static toResponse(model: DeteccaoEmergenciaModel): DeteccaoEmergenciaResponse {
    return {
      id: model.id,
      tipoEmergencia: TipoEmergenciaResponse.toResponse(model.tipoEmergencia!!),
      monitoramentos: [],
    } as any
  }
}
