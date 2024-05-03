import { GrandezaIdRequest } from '@/emergency/structures/requests/GrandezaIdRequest'
import { ApiProperty } from '@nestjs/swagger'

import { IsArray, IsDefined, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateTipoEmergenciaRequest {
  @IsDefined()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Nome do Tipo de Emergência', maxLength: 50, example: 'Incêndio' })
  nome: string

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Lista de das Grandezas associadas ao Tipo de Emergência',
    type: [GrandezaIdRequest],
    required: false,
    example: [{ id: 1 }]
  })
  grandezas?: GrandezaIdRequest[]
}
