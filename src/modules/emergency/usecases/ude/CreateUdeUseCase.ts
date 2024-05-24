import { Injectable } from '@nestjs/common'

import { UdeModel } from '@/emergency/models/UdeModel'
import { ZonaModel } from '@/emergency/models/ZonaModel'
import { UdeRepository } from '@/emergency/repositories/UdeRepository'
import { CreateUdeRequest } from '@/emergency/structures/requests/CreateUdeRequest'
import { UdeResponse } from '@/emergency/structures/responses/UdeResponse'
import { NotifyUdeUpdatedUseCase } from '@/emergency/usecases/ude/NotifyUdeUpdatedUseCase'
import { DeteccaoEmergenciaRequest } from '@/emergency/structures/requests/DeteccaoEmergenciaRequest'
import { MonitoramentoGrandezaRequest } from '@/emergency/structures/requests/MonitoramentoGrandezaRequest'
import { MonitoramentoGrandezaModel } from '@/emergency/models/MonitoramentoGrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { DeteccaoEmergenciaModel } from '@/emergency/models/DeteccaoEmergenciaModel'
import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'
import { IsolationLevel, Transactional } from 'typeorm-transactional'

@Injectable()
export class CreateUdeUseCase {
  constructor(
    private readonly udeRepository: UdeRepository,
    private readonly notifyUdeUpdatedUseCase: NotifyUdeUpdatedUseCase,
  ) { }

  @Transactional({ isolationLevel: IsolationLevel.READ_UNCOMMITTED })
  async execute(input: CreateUdeRequest): Promise<UdeResponse> {
    const {
      tipo,
      label,
      mac,
      latitude,
      longitude,
      operatingRange,
      zona: zonaId,
      deteccoesEmergencia: deteccoesEmergenciaInput
    } = input

    const zona = new ZonaModel({ id: zonaId?.id })

    const deteccoesEmergencia = deteccoesEmergenciaInput.map((deteccao: DeteccaoEmergenciaRequest) => {
      const { tipoEmergencia: tipoEmergenciaId, monitoramentos: monitoramentosInput } = deteccao

      const monitoramentos = monitoramentosInput.map((monitoramento: MonitoramentoGrandezaRequest) => {
        const {
          sensor: sensorId,
          grandeza: grandezaId,
          thresholdMinimo,
          thresholdMaximo,
          taxaVariacaoMinima,
          ativo
        } = monitoramento

        return new MonitoramentoGrandezaModel({
          sensor: new SensorModel({ id: sensorId.id }),
          grandeza: new GrandezaModel({ id: grandezaId.id }),
          thresholdMinimo,
          thresholdMaximo,
          taxaVariacaoMinima,
          ativo: ativo ?? true,
        })
      })

      return new DeteccaoEmergenciaModel({
        tipoEmergencia: new TipoEmergenciaModel({ id: tipoEmergenciaId.id }),
        monitoramentosGrandeza: monitoramentos,
      })
    })

    const model = new UdeModel({
      tipo,
      label,
      mac,
      latitude,
      longitude,
      operatingRange,
      zona,
      deteccoesEmergencia,
    })

    const createdModel = await this.udeRepository.save(model)

    try {
      await this.notifyUdeUpdatedUseCase.execute(createdModel.id)
    } catch (error) {
      console.error(error)
    }

    return UdeResponse.toResponse(createdModel)
  }
}
