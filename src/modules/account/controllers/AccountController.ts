import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AccountParam } from '@/account/helpers/AccountParam'
import { AccountFacade } from '@/account/services/AccountFacade'
import { SignInRequest } from '@/account/structures/requests/SignInRequest'
import { MyAccountResponse } from '@/account/structures/responses/MyAccountResponse'
import { SignInResponse } from '@/account/structures/responses/SignInResponse'
import { RoleGuard } from '@/auth/guards/RoleGuard'
import { Account } from '@/auth/interfaces/AuthPayload'
import { Roles } from '@/auth/decorators/Roles'
import { Role } from '@/account/structures/enum/Role'

@Controller({ version: '1', path: 'accounts' })
@ApiTags('accounts')
export class AccountController {
  constructor(
    private readonly accountFacade: AccountFacade
  ) { }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({ type: SignInResponse })
  signIn(
    @Body() request: SignInRequest
  ): Promise<SignInResponse> {
    return this.accountFacade.signIn(request)
  }

  @Get('/me')
  @UseGuards(RoleGuard)
  @Roles([Role.ADMIN, Role.USER, Role.GUEST])
  @ApiBearerAuth('Role Access Token')
  @ApiOperation({ summary: 'Get current Account info' })
  @ApiOkResponse({ status: 200, type: MyAccountResponse })
  me(
    @AccountParam() account: Account,
  ): Promise<MyAccountResponse> {
    return this.accountFacade.fetchMyAccount(account.id)
  }
}
