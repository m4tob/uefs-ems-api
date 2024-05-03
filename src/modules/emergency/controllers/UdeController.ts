import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { UdeFacade } from '@/emergency/services/UdeFacade'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'
import { CreateUdeRequest } from '@/emergency/structures/requests/CreateUdeRequest'
import { UpdateUdeRequest } from '@/emergency/structures/requests/UpdateUdeRequest'

@Controller({ version: '1', path: 'udes' })
@ApiTags('udes')
export class UdeController {
  constructor(private readonly udeFacade: UdeFacade) { }

  @Get('/')
  @ApiOperation({ summary: 'Lista as UDEs cadastradas no sistema' })
  @ApiOkResponse({ type: UdeResponse, isArray: true })
  list(): Promise<UdeResponse[]> {
    return this.udeFacade.list()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma UDE pelo seu ID' })
  @ApiParam({ name: 'id', description: 'Identificador da Ude', type: Number, example: 1 })
  @ApiOkResponse({ type: UdeResponse })
  @ApiNotFoundResponse({ description: 'UDE não encontrada' })
  findById(
    @Param('id') id: number,
  ): Promise<UdeResponse> {
    return this.udeFacade.findById(id)
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria uma nova UDE' })
  @ApiCreatedResponse({ type: UdeResponse })
  create(
    @Body() input: CreateUdeRequest,
  ): Promise<UdeResponse> {
    return this.udeFacade.create(input)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza uma UDE' })
  @ApiParam({ name: 'id', description: 'Identificador da UDE', type: Number, example: 1 })
  @ApiOkResponse({ type: UdeResponse })
  @ApiNotFoundResponse({ description: 'UDE não encontrada' })
  update(
    @Param('id') id: number,
    @Body() input: UpdateUdeRequest,
  ): Promise<UdeResponse> {
    return this.udeFacade.update(id, input)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta uma UDE' })
  @ApiParam({ name: 'id', description: 'Identificador da UDE', type: Number, example: 1 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'UDE não encontrada' })
  delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.udeFacade.delete(id)
  }
}
