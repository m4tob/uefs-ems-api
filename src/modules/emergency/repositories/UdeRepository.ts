import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { DatabaseRepository } from '@/core/repositories/DatabaseRepository'
import { UdeModel } from '@/emergency/models/UdeModel'

@Injectable()
export class UdeRepository extends DatabaseRepository<UdeModel, number> {
  public constructor(@InjectRepository(UdeModel) repository: Repository<UdeModel>) {
    super(repository, 'ude', [
      { field: 'ude.zona' },
      { field: 'ude.sensores', alias: 's' },
      { field: 's.especificacoes', alias: 'e' },
      { field: 'e.grandeza' },
    ])
  }
}
