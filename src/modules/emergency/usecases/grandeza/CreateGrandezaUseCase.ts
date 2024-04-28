import { Injectable } from '@nestjs/common'

import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { GrandezaRepository } from '@/emergency/repositories/GrandezaRepository'
import { CreateGrandezaRequest } from '@/emergency/structures/requests/CreateGrandezaRequest'
import { GrandezaResponse } from '@/emergency/structures/responses/GrandezaResponse'

@Injectable()
export class CreateGrandezaUseCase {
  constructor(
    private readonly grandezaRepository: GrandezaRepository,
  ) { }

  async execute(input: CreateGrandezaRequest): Promise<GrandezaResponse> {
    const { nome, unidadeMedida, sigla } = input

    const updatedModel = new GrandezaModel({
      nome,
      unidadeMedida,
      sigla,
    })

    const createdModel = await this.grandezaRepository.save(updatedModel)

    return GrandezaResponse.toResponse(createdModel)
  }
}
