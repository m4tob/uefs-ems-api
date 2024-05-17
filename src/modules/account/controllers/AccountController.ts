import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { AccountParam } from '@/account/helpers/AccountParam'
import { AccountFacade } from '@/account/services/AccountFacade'
import { SignInRequest } from '@/account/structures/requests/SignInRequest'
import { MyAccountResponse } from '@/account/structures/responses/MyAccountResponse'
import { SignInResponse } from '@/account/structures/responses/SignInResponse'
import { RoleGuard } from '@/auth/guards/RoleGuard'
import { Account } from '@/auth/interfaces/AuthPayload'
import { Roles } from '@/auth/decorators/Roles'
import { Role } from '@/account/structures/enum/Role'
import { AccountResponse } from '@/account/structures/responses/AccountResponse'
import { CreateAccountRequest } from '@/account/structures/requests/CreateAccountRequest'
import { UpdateAccountRequest } from '@/account/structures/requests/UpdateAccountRequest'

@Controller({ version: '1', path: 'usuarios' })
@ApiTags('usuarios')
export class AccountController {
  constructor(
    private readonly accountFacade: AccountFacade
  ) { }

  @Get('/')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Lista os Usuários cadastrados no sistema' })
  @ApiOkResponse({ type: AccountResponse, isArray: true })
  list(): Promise<AccountResponse[]> {
    return this.accountFacade.list()
  }

  @Post('/')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Cria um novo Usuário' })
  @ApiCreatedResponse({ type: AccountResponse })
  create(
    @Body() input: CreateAccountRequest,
  ): Promise<AccountResponse> {
    return this.accountFacade.create(input)
  }

  @Put('/:id')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Atualiza um Usuário' })
  @ApiParam({ name: 'id', description: 'Identificador do Usuário', type: Number, example: 1 })
  @ApiOkResponse({ type: AccountResponse })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  update(
    @Param('id') id: number,
    @Body() input: UpdateAccountRequest,
  ): Promise<AccountResponse> {
    return this.accountFacade.update(id, input)
  }

  @Delete('/:id')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Deleta um Usuário' })
  @ApiParam({ name: 'id', description: 'Identificador do Usuário', type: Number, example: 1 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.accountFacade.delete(id)
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ type: SignInResponse })
  signIn(
    @Body() request: SignInRequest
  ): Promise<SignInResponse> {
    return this.accountFacade.signIn(request)
  }

  @Get('/me')
  @UseGuards(RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth('Role Access Token')
  @ApiOperation({ summary: 'Get current Account info' })
  @ApiOkResponse({ status: 200, type: MyAccountResponse })
  me(
    @AccountParam() account: Account,
  ): Promise<MyAccountResponse> {
    return this.accountFacade.fetchMyAccount(account.id)
  }

  @Get('/:id')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Busca um Usuário pelo seu ID' })
  @ApiParam({ name: 'id', description: 'Identificador do Usuário', type: Number, example: 1 })
  @ApiOkResponse({ type: AccountResponse })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  findById(
    @Param('id') id: number,
  ): Promise<AccountResponse> {
    return this.accountFacade.findById(id)
  }
}
