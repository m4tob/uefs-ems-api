import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { TipoEmergenciaFacade } from '@/emergency/services/TipoEmergenciaFacade'
import { TipoEmergenciaResponse } from '@/emergency/structures/responses/TipoEmergenciaResponse'
import { CreateTipoEmergenciaRequest } from '@/emergency/structures/requests/CreateTipoEmergenciaRequest'
import { UpdateTipoEmergenciaRequest } from '@/emergency/structures/requests/UpdateTipoEmergenciaRequest'

@Controller({ version: '1', path: 'tipos-emergencia' })
@ApiTags('tipos-emergencia')
export class TipoEmergenciaController {
  constructor(private readonly tipoEmergenciaFacade: TipoEmergenciaFacade) { }

  @Get('/')
  @ApiOperation({ summary: 'Lista os Tipos de Emergência cadastrados no sistema' })
  @ApiOkResponse({ type: TipoEmergenciaResponse, isArray: true })
  list(): Promise<TipoEmergenciaResponse[]> {
    return this.tipoEmergenciaFacade.list()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca um Tipo de Emergência pelo seu ID' })
  @ApiOkResponse({ type: TipoEmergenciaResponse })
  @ApiNotFoundResponse({ description: 'Tipo de Emergência não encontrado' })
  findById(
    @Param('id') id: number,
  ): Promise<TipoEmergenciaResponse> {
    return this.tipoEmergenciaFacade.findById(id)
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria um novo Tipo de Emergência' })
  @ApiCreatedResponse({ type: TipoEmergenciaResponse })
  create(
    @Body() request: CreateTipoEmergenciaRequest,
  ): Promise<TipoEmergenciaResponse> {
    return this.tipoEmergenciaFacade.create(request)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza um Tipo de Emergência' })
  @ApiParam({ name: 'id', description: 'Identificador do Tipo de Emergência', type: Number, example: 1 })
  @ApiOkResponse({ type: TipoEmergenciaResponse })
  @ApiNotFoundResponse({ description: 'Tipo de Emergência não encontrado' })
  update(
    @Param('id') id: number,
    @Body() input: UpdateTipoEmergenciaRequest,
  ): Promise<TipoEmergenciaResponse> {
    return this.tipoEmergenciaFacade.update(id, input)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove um Tipo de Emergência' })
  @ApiParam({ name: 'id', description: 'Identificador do Tipo de Emergência', type: Number, example: 1 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Tipo de Emergência não encontrado' })
  delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.tipoEmergenciaFacade.delete(id)
  }
}
