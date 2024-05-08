import { Injectable, NotFoundException } from '@nestjs/common'

import { ErrorMessages } from '@/core/helpers/ErrorMessages'
import { ZonaModel } from '@/emergency/models/ZonaModel'
import { UdeRepository } from '@/emergency/repositories/UdeRepository'
import { UpdateUdeRequest } from '@/emergency/structures/requests/UpdateUdeRequest'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'

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

    const { label, mac, latitude, longitude, operatingRange, zona: zonaId } = input

    const zona = new ZonaModel({ id: zonaId?.id })
    // const detecocesEmergencia = [] // TODO

    model.label = label
    model.mac = mac
    model.latitude = latitude
    model.longitude = longitude
    model.operatingRange = operatingRange

    model.zonaId = zona.id
    // model.detecocesEmergencia = detecocesEmergencia // TODO

    const updatedModel = await this.udeRepository.save(model)

    return UdeResponse.toResponse(updatedModel)
  }
}
