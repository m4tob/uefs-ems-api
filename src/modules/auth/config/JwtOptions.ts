import { Environment as envs } from '@/Environment'

export const JwtOptions = {
  access: {
    secret: envs.JWT_SECRET,
    expiresIn: '20m',
  },
  refresh: {
    secret: envs.JWT_SECRET,
    expiresIn: '30d',
  },
}
