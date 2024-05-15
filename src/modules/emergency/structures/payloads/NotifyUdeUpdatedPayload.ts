

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
          // Remove duplicates by sensor id
          .filter((m1, index, self) => index === self.findIndex((m2) => (m1.sensorId === m2.sensorId && m1.grandezaId === m2.grandezaId)))
          .forEach(monitoramento => result.push({
            modelo: monitoramento.sensor!!.modelo,
            grandeza: (monitoramento.grandeza?.nome.toLowerCase() || 'grandeza')
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          }))
        return result
      }, [] as SensorAtivoPayload[])

    const emergencias = model.deteccoesEmergencia
      ?.reduce((result: any, d: DeteccaoEmergenciaModel, dIndex: number) => {
        const grandezas = d.monitoramentosGrandeza
          ?.reduce((mAcc: any, monitoramento, mIndex: number) => {
            let mKey = monitoramento.grandeza?.nome.toLowerCase() || `grandeza_${mIndex}`
            mKey = mKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            mAcc[mKey] = {
              thresholdMinimo: monitoramento.thresholdMinimo || null,
              thresholdMaximo: monitoramento.thresholdMaximo || null,
            }
            return mAcc
          }, {} as EmergenciaPayload)

        let eKey = d.tipoEmergencia?.nome.toLowerCase() || `emergencia_${dIndex}`
        eKey = eKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (!result[eKey]) {
          result[eKey] = []
        }
        result[eKey].push(grandezas)

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
