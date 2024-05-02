import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { GrandezaFacade } from '@/emergency/services/GrandezaFacade'
import { GrandezaResponse } from '@/emergency/structures/responses/GrandezaResponse'
import { CreateGrandezaRequest } from '@/emergency/structures/requests/CreateGrandezaRequest'
import { UpdateGrandezaRequest } from '@/emergency/structures/requests/UpdateGrandezaRequest'

@Controller({ version: '1', path: 'grandezas' })
@ApiTags('grandezas')
export class GrandezaController {
  constructor(private readonly grandezaFacade: GrandezaFacade) { }

  @Get('/')
  @ApiOperation({ summary: 'Lista as Grandezas cadastradas no sistema' })
  @ApiOkResponse({ type: GrandezaResponse, isArray: true })
  list(): Promise<GrandezaResponse[]> {
    return this.grandezaFacade.list()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma Grandeza pelo seu ID' })
  @ApiParam({ name: 'id', description: 'Identificador da Grandeza', type: Number, example: 1 })
  @ApiOkResponse({ type: GrandezaResponse })
  @ApiNotFoundResponse({ description: 'Grandeza não encontrada' })
  findById(
    @Param('id') id: number,
  ): Promise<GrandezaResponse> {
    return this.grandezaFacade.findById(id)
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria uma nova Grandeza' })
  @ApiCreatedResponse({ type: GrandezaResponse })
  create(
    @Body() input: CreateGrandezaRequest,
  ): Promise<GrandezaResponse> {
    return this.grandezaFacade.create(input)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza uma Grandeza' })
  @ApiParam({ name: 'id', description: 'Identificador da Grandeza', type: Number, example: 1 })
  @ApiOkResponse({ type: GrandezaResponse })
  @ApiNotFoundResponse({ description: 'Grandeza não encontrada' })
  update(
    @Param('id') id: number,
    @Body() input: UpdateGrandezaRequest,
  ): Promise<GrandezaResponse> {
    return this.grandezaFacade.update(id, input)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta uma Grandeza' })
  @ApiParam({ name: 'id', description: 'Identificador da Grandeza', type: Number, example: 1 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Grandeza não encontrada' })
  delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.grandezaFacade.delete(id)
  }
}
