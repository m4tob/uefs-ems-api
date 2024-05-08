import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsNumber, IsOptional } from 'class-validator'

import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'
import { GrandezaResponse } from '@/emergency/structures/responses/GrandezaResponse'
import { SensorResponse } from '@/emergency/structures/responses/SensorResponse'

export class DeteccaoEmergenciaResponse {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'Identificador da Configuração de Detecção de Emergência', example: 1 })
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
  @ApiProperty({ description: 'Indica se a detecção está ativa', example: true })
  ativo: Boolean

  static toResponse(model: TipoEmergenciaModel): DeteccaoEmergenciaResponse {
    return {
      id: model.id,
      nome: model.nome,
      grandezas: (model.grandezas || []).map((grandeza) => GrandezaResponse.toResponse(grandeza)),
    } as any
  }
}
