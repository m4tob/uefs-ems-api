import { Injectable, NotFoundException } from '@nestjs/common'

import { UdeRepository } from '@/emergency/repositories/UdeRepository'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'
import { UpdateUdeRequest } from '@/emergency/structures/requests/UpdateUdeRequest'
import { ErrorMessages } from '@/core/helpers/ErrorMessages'
import { SensorModel } from '@/emergency/models/SensorModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'

@Injectable()
export class UpdateUdeUseCase {
  constructor(
    private readonly udeRepository: UdeRepository,
  ) { }

  async execute(id: number, input: UpdateUdeRequest): Promise<UdeResponse> {
    const model = await this.udeRepository.findById(id)
    if (!model) {
      throw new NotFoundException(ErrorMessages.emergency.ude.notFound)
    }

    const { label, mac, latitude, longitude, operatingRange, zona: zonaId, sensores: sensoresIds } = input

    const zona = new ZonaModel({ id: zonaId?.id })
    const sensores = sensoresIds?.map((sensorId) => new SensorModel({ id: sensorId.id })) || []

    model.label = label
    model.mac = mac
    model.latitude = latitude
    model.longitude = longitude
    model.operatingRange = operatingRange

    model.zonaId = zona.id
    model.sensores = sensores

    const updatedModel = await this.udeRepository.save(model)

    return UdeResponse.toResponse(updatedModel)
  }
}
