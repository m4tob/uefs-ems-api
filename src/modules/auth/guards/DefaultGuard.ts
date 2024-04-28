import { Injectable } from '@nestjs/common'

import { JwtGuard } from '@/auth/guards/JwtGuard'
import { AuthPayload } from '@/auth/interfaces/AuthPayload'
import { DefaultAuthService } from '@/auth/services/DefaultAuthService'

@Injectable()
export class DefaultGuard extends JwtGuard<AuthPayload> {
  constructor (defaultAuthService: DefaultAuthService) {
    super(defaultAuthService)
  }

  async handlePayload (req, _res, payload) {
    req.account = payload.account
  }
}