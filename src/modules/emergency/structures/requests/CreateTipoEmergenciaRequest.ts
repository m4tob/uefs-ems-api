import { ApiProperty } from '@nestjs/swagger'

import { IsArray, IsDefined, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

class GrandezaId {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: 'ID da Grandeza', example: 1 })
  id: number
}

export class CreateTipoEmergenciaRequest {
  @IsDefined()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Nome do Tipo de Emergência', maxLength: 50, example: 'Incêndio' })
  nome: string

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Lista de IDs das Grandezas associadas ao Tipo de Emergência',
    type: [GrandezaId],
    example: [{ id: 1 }]
  })
  grandezas?: GrandezaId[]
}
