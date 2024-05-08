import { Injectable } from '@nestjs/common'

import { UdeModel } from '@/emergency/models/UdeModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'
import { UdeRepository } from '@/emergency/repositories/UdeRepository'
import { CreateUdeRequest } from '@/emergency/structures/requests/CreateUdeRequest'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'

@Injectable()
export class CreateUdeUseCase {
  constructor(
    private readonly udeRepository: UdeRepository,
  ) { }

  async execute(input: CreateUdeRequest): Promise<UdeResponse> {
    const { label, mac, latitude, longitude, operatingRange, zona: zonaId } = input

    const zona = new ZonaModel({ id: zonaId?.id })
    // const deteccoesEmergencia = [] // TODO

    const model = new UdeModel({
      label,
      mac,
      latitude,
      longitude,
      operatingRange,
      zona,
      // deteccoesEmergencia, // TODO
    })

    const createdModel = await this.udeRepository.save(model)

    return UdeResponse.toResponse(createdModel)
  }
}
