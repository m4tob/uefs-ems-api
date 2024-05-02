import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GrandezaController } from '@/emergency/controllers/GrandezaController'
import { SensorController } from '@/emergency/controllers/SensorController'
import { TipoEmergenciaController } from '@/emergency/controllers/TipoEmergenciaController'
import { EduModel } from '@/emergency/models/EduModel'
import { EspecificacaoGrandezaModel } from '@/emergency/models/EspecificacaoGrandezaModel'
import { GrandezaModel } from '@/emergency/models/GrandezaModel'
import { SensorModel } from '@/emergency/models/SensorModel'
import { TipoEmergenciaModel } from '@/emergency/models/TipoEmergenciaModel'
import { GrandezaRepository } from '@/emergency/repositories/GrandezaRepository'
import { TipoEmergenciaRepository } from '@/emergency/repositories/TipoEmergenciaRepository'
import { GrandezaFacade } from '@/emergency/services/GrandezaFacade'
import { SensorFacade } from '@/emergency/services/SensorFacade'
import { TipoEmergenciaFacade } from '@/emergency/services/TipoEmergenciaFacade'
import { CreateGrandezaUseCase } from '@/emergency/usecases/grandeza/CreateGrandezaUseCase'
import { DeleteGrandezaUseCase } from '@/emergency/usecases/grandeza/DeleteGrandezaUseCase'
import { FindGrandezaByIdUseCase } from '@/emergency/usecases/grandeza/FindGrandezaByIdUseCase'
import { ListGrandezasUseCase } from '@/emergency/usecases/grandeza/ListGrandezasUseCase'
import { UpdateGrandezaUseCase } from '@/emergency/usecases/grandeza/UpdateGrandezaUseCase'
import { CreateSensorUseCase } from '@/emergency/usecases/sensor/CreateSensorUseCase'
import { DeleteSensorUseCase } from '@/emergency/usecases/sensor/DeleteSensorUseCase'
import { FindSensorByIdUseCase } from '@/emergency/usecases/sensor/FindSensorByIdUseCase'
import { ListSensoresUseCase } from '@/emergency/usecases/sensor/ListSensoresUseCase'
import { UpdateSensorUseCase } from '@/emergency/usecases/sensor/UpdateSensorUseCase'
import { CreateTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/CreateTipoEmergenciaUseCase'
import { DeleteTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/DeleteTipoEmergenciaUseCase'
import { FindTipoEmergenciaByIdUseCase } from '@/emergency/usecases/tipo-emergencia/FindTipoEmergenciaByIdUseCase'
import { ListTiposEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/ListTiposEmergenciaUseCase'
import { UpdateTipoEmergenciaUseCase } from '@/emergency/usecases/tipo-emergencia/UpdateTipoEmergenciaUseCase'
import { SensorRepository } from '@/emergency/repositories/SensorRepository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrandezaModel,
      TipoEmergenciaModel,
      SensorModel,
      EspecificacaoGrandezaModel,
      EduModel,
    ]),
  ],
  controllers: [
    GrandezaController,
    TipoEmergenciaController,
    SensorController,
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

    ListSensoresUseCase,
    FindSensorByIdUseCase,
    CreateSensorUseCase,
    UpdateSensorUseCase,
    DeleteSensorUseCase,

    // Facade
    GrandezaFacade,
    TipoEmergenciaFacade,
    SensorFacade,

    // Repositories
    GrandezaRepository,
    TipoEmergenciaRepository,
    SensorRepository,
  ],
})
export class EmergencyModule { }
