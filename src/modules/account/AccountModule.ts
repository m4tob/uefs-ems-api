import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountController } from '@/account/controllers/AccountController'
import { AccountModel } from '@/account/models/AccountModel'
import { AccountRepository } from '@/account/repositories/AccountRepository'
import { AccountFacade } from '@/account/services/AccountFacade'
import { FetchMyAccountUseCase } from '@/account/usecases/FetchMyAccountUseCase'
import { SignInUseCase } from '@/account/usecases/SignInUseCase'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountModel, //
    ]),
  ],
  controllers: [AccountController],
  providers: [
    // Usecases
    FetchMyAccountUseCase,
    SignInUseCase,

    // Services
    AccountFacade,

    // Repositories
    AccountRepository,
  ],
  exports: [
    AccountFacade,
    AccountRepository,
  ]
})
export class AccountModule {}
