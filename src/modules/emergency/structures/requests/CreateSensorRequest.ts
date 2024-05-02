import { EspecificacaoGrandezaRequest } from '@/emergency/structures/requests/EspecificacaoGrandezaRequest'
import { ApiProperty } from '@nestjs/swagger'

import { IsArray, IsDefined, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateSensorRequest {
  @IsDefined()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Modelo do Sensor', maxLength: 50, example: 'Temperatura' })
  modelo: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ description: 'Descrição do Sensor', required: false, maxLength: 255, example: '' })
  descricao?: string

  @IsDefined()
  @IsArray()
  @ApiProperty({
    description: 'Lista de Especificações de Grandeza associadas ao Sensor',
    type: [EspecificacaoGrandezaRequest],
  })
  especificacoes: EspecificacaoGrandezaRequest[]
}
