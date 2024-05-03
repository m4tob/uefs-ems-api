import { Injectable } from '@nestjs/common'

import { UdeModel } from '@/emergency/models/UdeModel'
import { UdeRepository } from '@/emergency/repositories/UdeRepository'
import { CreateUdeRequest } from '@/emergency/structures/requests/CreateUdeRequest'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'
import { SensorModel } from '@/emergency/models/SensorModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'

@Injectable()
export class CreateUdeUseCase {
  constructor(
    private readonly udeRepository: UdeRepository,
  ) { }

  async execute(input: CreateUdeRequest): Promise<UdeResponse> {
    const { label, mac, latitude, longitude, operatingRange, zona: zonaId, sensores: sensoresIds } = input

    const zona = new ZonaModel({ id: zonaId?.id })
    const sensores = sensoresIds?.map((sensorId) => new SensorModel({ id: sensorId?.id })) || []

    const model = new UdeModel({
      label,
      mac,
      latitude,
      longitude,
      operatingRange,
      zona,
      sensores,
    })

    const createdModel = await this.udeRepository.save(model)

    return UdeResponse.toResponse(createdModel)
  }
}
