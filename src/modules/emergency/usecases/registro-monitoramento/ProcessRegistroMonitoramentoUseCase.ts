import { Injectable } from '@nestjs/common'


@Injectable()
export class ProcessRegistroMonitoramentoUseCase {
  constructor(
  ) { }

  async execute(input: any): Promise<void> {
    console.log('ProcessRegistroMonitoramentoUseCase', input)
  }
}
