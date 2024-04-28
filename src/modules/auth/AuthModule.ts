import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { DefaultGuard } from '@/auth/guards/DefaultGuard'
import { DefaultAuthService } from '@/auth/services/DefaultAuthService'

@Global()
@Module({})
export class AuthModule {
  static registerDefault (jwtOptions: any): DynamicModule {
    const { accessJwtService, refreshJwtService } = AuthModule.createJwtServices(jwtOptions)

    return {
      module: AuthModule,
      imports: [
        PassportModule.register({defaultStrategy: 'jwt'})
      ],
      providers: [
        DefaultGuard,
        DefaultAuthService,
        { provide: 'DefaultAccessJwtService', useValue: accessJwtService },
        { provide: 'DefaultRefreshJwtService', useValue: refreshJwtService },
      ],
      exports: [
        DefaultGuard,
        DefaultAuthService,
      ],
    }
  }

  static createJwtServices (jwtOptions: any) {
    const accessJwtService = new JwtService({
      secret: jwtOptions.access.secret,
      signOptions: {
        expiresIn: jwtOptions.access.expiresIn,
      },
    })
    const refreshJwtService = new JwtService({
      secret: jwtOptions.refresh.secret,
      signOptions: {
        expiresIn: jwtOptions.refresh.expiresIn,
      },
    })

    return { accessJwtService, refreshJwtService }
  }
}
