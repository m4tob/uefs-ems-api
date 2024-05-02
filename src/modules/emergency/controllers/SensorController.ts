import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { SensorFacade } from '@/emergency/services/SensorFacade'
import { SensorResponse } from '@/emergency/structures/responses/SensorResponse'
import { CreateSensorRequest } from '@/emergency/structures/requests/CreateSensorRequest'
import { UpdateSensorRequest } from '@/emergency/structures/requests/UpdateSensorRequest'

@Controller({ version: '1', path: 'sensores' })
@ApiTags('sensores')
export class SensorController {
  constructor(private readonly SensorFacade: SensorFacade) { }

  @Get('/')
  @ApiOperation({ summary: 'Lista os Sensores cadastrados no sistema' })
  @ApiOkResponse({ type: SensorResponse, isArray: true })
  list(): Promise<SensorResponse[]> {
    return this.SensorFacade.list()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca um Sensor pelo seu ID' })
  @ApiParam({ name: 'id', description: 'Identificador do Sensor', type: Number, example: 1 })
  @ApiOkResponse({ type: SensorResponse })
  @ApiNotFoundResponse({ description: 'Sensor não encontrado' })
  findById(
    @Param('id') id: number,
  ): Promise<SensorResponse> {
    return this.SensorFacade.findById(id)
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria um nova Sensor' })
  @ApiCreatedResponse({ type: SensorResponse })
  create(
    @Body() input: CreateSensorRequest,
  ): Promise<SensorResponse> {
    return this.SensorFacade.create(input)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza um Sensor' })
  @ApiParam({ name: 'id', description: 'Identificador do Sensor', type: Number, example: 1 })
  @ApiOkResponse({ type: SensorResponse })
  @ApiNotFoundResponse({ description: 'Sensor não encontrado' })
  update(
    @Param('id') id: number,
    @Body() input: UpdateSensorRequest,
  ): Promise<SensorResponse> {
    return this.SensorFacade.update(id, input)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um Sensor' })
  @ApiParam({ name: 'id', description: 'Identificador do Sensor', type: Number, example: 1 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Sensor não encontrado' })
  delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.SensorFacade.delete(id)
  }
}
