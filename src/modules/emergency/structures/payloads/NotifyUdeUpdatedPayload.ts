

import { DeteccaoEmergenciaModel } from '@/emergency/models/DeteccaoEmergenciaModel'
import { UdeModel } from '@/emergency/models/UdeModel'
import { TipoUdeEnum } from '@/emergency/structures/enum/TipoUdeEnum'

class SensorAtivoPayload {
  modelo: string
  grandeza: string
}

class EmergenciaPayload {
  [key: string]: {
    thresholdMinimo: number | null
    thresholdMaximo: number | null
  }
}

class EmergenciasPayload {
  [key: string]: EmergenciaPayload
}

export class NotifyUdeUpdatedPayload {
  id: number
  tipo: TipoUdeEnum
  mac: string
  latitude: number
  longitude: number
  zona: number
  sensoresAtivos: SensorAtivoPayload[]
  emergencias: EmergenciasPayload

  static parse(model: UdeModel): NotifyUdeUpdatedPayload {
    const sensoresAtivos = model.deteccoesEmergencia
      ?.reduce((result: any, deteccao: DeteccaoEmergenciaModel) => {
        deteccao.monitoramentosGrandeza
          ?.filter(m => m.ativo)
          .forEach(monitoramento => result.push({
            modelo: monitoramento.sensor!!.modelo,
            grandeza: monitoramento.grandeza?.nome.toLowerCase() || 'grandeza'
          }))
        return result
      }, [] as SensorAtivoPayload[])

    const emergencias = model.deteccoesEmergencia
      ?.reduce((result: any, d: DeteccaoEmergenciaModel, dIndex: number) => {
        const grandezas = d.monitoramentosGrandeza
          ?.reduce((mAcc: any, monitoramento, mIndex: number) => {
            mAcc[monitoramento.grandeza?.nome.toLowerCase() || `grandeza_${mIndex}`] = {
              thresholdMinimo: monitoramento.thresholdMinimo || null,
              thresholdMaximo: monitoramento.thresholdMaximo || null,
            }
            return mAcc
          }, {} as EmergenciaPayload)

        result[d.tipoEmergencia?.nome.toLowerCase() || `emergency_${dIndex}`] = grandezas

        return result
      }, {} as EmergenciasPayload)

    return {
      id: model.id,
      tipo: model.tipo,
      mac: model.mac,
      latitude: model.latitude,
      longitude: model.longitude,
      zona: model.zona!.id,
      sensoresAtivos,
      emergencias,
    }
  }
}
