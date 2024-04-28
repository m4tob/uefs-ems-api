import { IsDefined, IsString } from 'class-validator'

export class SignInRequest {
  @IsDefined()
  @IsString()
  email: string

  @IsDefined()
  @IsString()
  password: string
}
