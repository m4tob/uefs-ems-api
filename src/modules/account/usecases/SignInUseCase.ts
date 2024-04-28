import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '@/account/repositories/AccountRepository'
import { SignInRequest } from '@/account/structures/requests/SignInRequest'
import { AccountResponse } from '@/account/structures/responses/AccountResponse'
import { SignInResponse } from '@/account/structures/responses/SignInResponse'
import { AuthPayload } from '@/auth/interfaces/AuthPayload'
import { DefaultAuthService } from '@/auth/services/DefaultAuthService'
import { ErrorMessages } from '@/core/helpers/ErrorMessages'

@Injectable()
export class SignInUseCase {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly defaultAuthService: DefaultAuthService,
  ) {}

  async execute (request: SignInRequest): Promise<SignInResponse> {
    const account = await this.accountRepository.findOneBy({ email: request.email })
    if(!account) {
      throw new NotFoundException(ErrorMessages.account.notFound)
    }

    const accountAuthData: AuthPayload = {
      account: {
        id: account.id,
        nome: account.nome,
      }
    }

    const bearerToken = await this.defaultAuthService.generateAccessToken(accountAuthData)
    const refreshToken = await this.defaultAuthService.generateRefreshToken(accountAuthData)

    return {
      account: AccountResponse.toResponse(account),
      bearerToken,
      refreshToken,
    }
  }
}
