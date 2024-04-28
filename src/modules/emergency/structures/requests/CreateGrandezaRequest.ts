import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateGrandezaRequest {
  @IsDefined()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Nome da Grandeza', maxLength: 50, example: 'Temperatura' })
  nome: string

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'Unidade de Medida da Grandeza', maxLength: 50, example: 'Celsius' })
  unidadeMedida?: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ description: 'Sigla da Grandeza', maxLength: 20, example: '°C' })
  sigla?: string
}
