import { GrandezaIdRequest } from "@/emergency/structures/requests/GrandezaIdRequest"
import { SensorIdRequest } from "@/emergency/structures/requests/SensorIdRequest"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDefined, IsNumber, IsOptional } from "class-validator"

export class DeteccaoEmergenciaRequest {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Identificador da Detecção de Emergência', example: 1 })
  id?: number

  @IsDefined()
  @ApiProperty({ description: 'Sensor responsável pelo monitoramento', type: SensorIdRequest })
  sensor: SensorIdRequest

  @IsDefined()
  @ApiProperty({ description: 'Grandeza monitorada', type: GrandezaIdRequest })
  grandeza: GrandezaIdRequest

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