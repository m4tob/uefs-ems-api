import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthPayload } from '@/auth/interfaces/AuthPayload'
import { AuthService } from '@/auth/services/AuthService'

@Injectable()
export class DefaultAuthService extends AuthService<AuthPayload> {
  constructor (
    @Inject('DefaultAccessJwtService') accessJwtService: JwtService,
    @Inject('DefaultRefreshJwtService') refreshJwtService: JwtService,
  ) {
    super(accessJwtService, refreshJwtService)
  }
}
