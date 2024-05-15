import { TipoUdeEnum } from "@/emergency/structures/enum/TipoUdeEnum"
import { DeteccaoEmergenciaRequest } from "@/emergency/structures/requests/DeteccaoEmergenciaRequest"
import { ZonaIdRequest } from "@/emergency/structures/requests/ZonaIdRequest"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateUdeRequest {
  @IsDefined()
  @IsEnum(TipoUdeEnum)
  @ApiProperty({ description: 'Tipo de UDE', enum: TipoUdeEnum, example: 'APC' })
  tipo: TipoUdeEnum

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

  @IsDefined()
  @ApiProperty({ description: 'Zona de atuação da UDE', required: false, type: ZonaIdRequest })
  zona: ZonaIdRequest

  @IsDefined()
  @IsArray()
  @ApiProperty({
    description: 'Lista dos Configurações de Detecção de Emergências',
    type: [DeteccaoEmergenciaRequest],
  })
  deteccoesEmergencia: DeteccaoEmergenciaRequest[]
}
