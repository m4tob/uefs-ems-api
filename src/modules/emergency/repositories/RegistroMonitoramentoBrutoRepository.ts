import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { DatabaseRepository } from '@/core/repositories/DatabaseRepository'
import { RegistroMonitoramentoBrutoModel } from '@/emergency/models/RegistroMonitoramentoBrutoModel'
import { RegistrosMonitoramentoSearchFilters } from '@/emergency/structures/queries/RegistrosMonitoramentoSearchFilters'

@Injectable()
export class RegistroMonitoramentoBrutoRepository extends DatabaseRepository<RegistroMonitoramentoBrutoModel, number> {
  public constructor(@InjectRepository(RegistroMonitoramentoBrutoModel) repository: Repository<RegistroMonitoramentoBrutoModel>) {
    super(repository, 'registro_monitoramento_bruto')
  }

  async search(filters: RegistrosMonitoramentoSearchFilters): Promise<RegistroMonitoramentoBrutoModel[]> {
    const query = this.repository.createQueryBuilder('registro_monitoramento')

    if (filters.zonaId) {
      query.innerJoin('registro_monitoramento.ude', 'ude')
      query.where('ude.zonaId = :zonaId', { zonaId: filters.zonaId })
    }

    if (filters.tipoEmergenciaId) {
      query.innerJoin('registro_monitoramento.ude', 'ude')
      query.innerJoin('ude.deteccoesEmergencia', 'deteccaoEmergencia')
      query.where('deteccaoEmergencia.tipoEmergenciaId = :tipoEmergenciaId', { tipoEmergenciaId: filters.tipoEmergenciaId })
    }

    if (filters.udeId) {
      query.where('registro_monitoramento.udeId = :udeId', { udeId: filters.udeId })
    }

    if (filters.grandezasIds?.length) {
      query.where('registro_monitoramento.grandezaId IN (:...grandezasIds)', { grandezasIds: filters.grandezasIds })
    }

    if (filters.dataInicial) {
      query.andWhere('registro_monitoramento.dataColeta >= :dataInicial', { dataInicial: filters.dataInicial })
    }

    if (filters.dataFinal) {
      query.andWhere('registro_monitoramento.dataColeta <= :dataFinal', { dataFinal: filters.dataFinal })
    }

    return query.getMany()
  }
}