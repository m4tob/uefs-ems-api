import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GrandezaController } from '@/emergency/controllers/GrandezaController'
import { TipoEmergenciaController } from '@/emergency/controllers/TipoEmergenciaController'
import { EduModel } from '@/emergency/models/EduModel'
import { EspecificacaoGrandezaModel } from '@/emergency/models/EspecificacaoGrandezaModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'
import { GrandezaRepository } from '@/emergency/repositories/GrandezaRepository'
import { TipoEmergenciaRepository } from '@/emergency/repositories/TipoEmergenciaRepository'
import { GrandezaFacade } from '@/emergency/services/GrandezaFacade'
import { TipoEmergenciaFacade } from '@/emergency/services/TipoEmergenciaFacade'
import { CreateGrandezaUseCase } from '@/emergency/usecases/grandeza/CreateGrandezaUseCase'
import { DeleteGrandezaUseCase } from '@/emergency/usecases/grandeza/DeleteGrandezaUseCase'
import { FindGrandezaByIdUseCase } from '@/emergency/usecases/grandeza/FindGrandezaByIdUseCase'
import { ListGrandezasUseCase } from '@/emergency/usecases/grandeza/ListGrandezasUseCase'
import { UpdateGrandezaUseCase } from '@/emergency/usecases/grandeza/UpdateGrandezaUseCase'
import { CreateTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/CreateTipoEmergenciaUseCase'
import { DeleteTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/DeleteTipoEmergenciaUseCase'
import { FindTipoEmergenciaByIdUseCase } from '@/emergency/usecases/tipo-emergencia/FindTipoEmergenciaByIdUseCase'
import { ListTiposEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/ListTiposEmergenciaUseCase'
import { UpdateTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/UpdateTipoEmergenciaUseCase'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EduModel,
      EspecificacaoGrandezaModel,
      GrandezaModel,
      SensorModel,
      TipoEmergenciaModel,
    ]),
  ],
  controllers: [
    GrandezaController,
    TipoEmergenciaController,
  ],
  providers: [
    // Usecases
    ListGrandezasUseCase,
    FindGrandezaByIdUseCase,
    CreateGrandezaUseCase,
    UpdateGrandezaUseCase,
    DeleteGrandezaUseCase,

    ListTiposEmergenciaUseCase,
    FindTipoEmergenciaByIdUseCase,
    CreateTipoEmergenciaUseCase,
    UpdateTipoEmergenciaUseCase,
    DeleteTipoEmergenciaUseCase,

    // Facade
    GrandezaFacade,
    TipoEmergenciaFacade,

    // Repositories
    GrandezaRepository,
    TipoEmergenciaRepository,
  ],
})
export class EmergencyModule { }
