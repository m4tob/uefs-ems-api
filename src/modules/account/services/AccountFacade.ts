import { Injectable } from '@nestjs/common'

import { SignInRequest } from '@/account/structures/requests/SignInRequest'
import { MyAccountResponse } from '@/account/structures/responses/MyAccountResponse'
import { SignInResponse } from '@/account/structures/responses/SignInResponse'
import { FetchMyAccountUseCase } from '@/account/usecases/FetchMyAccountUseCase'
import { SignInUseCase } from '@/account/usecases/SignInUseCase'

@Injectable()
export class AccountFacade {
  constructor (
    private readonly signInUseCase: SignInUseCase,
    private readonly fetchMyAccountUseCase: FetchMyAccountUseCase,
  ) {}

  signIn (request: SignInRequest): Promise<SignInResponse> {
    return this.signInUseCase.execute(request)
  }

  fetchMyAccount (accountId: number): Promise<MyAccountResponse> {
    return this.fetchMyAccountUseCase.execute(accountId)
  }
}
