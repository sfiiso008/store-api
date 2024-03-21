import { Type, getValidator, defaultAppConfiguration } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { dataValidator } from './validators'
import 'dotenv/config'

export const configurationSchema = Type.Object({
  host: Type.String(),
  port: Type.Number(),
  public: Type.String(),
  uploads: Type.String(),
  origins: Type.Array(Type.String()),
  paginate: Type.Object({
    default: Type.Number(),
    max: Type.Number()
  }),
  aws: Type.Object({
    endpoint: Type.String(),
    bucket: Type.String(),
    accessKeyId: Type.String(),
    secretAccessKey: Type.String()
  }),
  mongodb: Type.String(),
  authentication: Type.Object({
    secret: Type.String(),
    authStrategies: Type.Array(Type.String()),
    jwtOptions: Type.Object({
      header: Type.Object({
        typ: Type.String()
      }),
      audience: Type.String(),
      issuer: Type.String(),
      algorithm: Type.String(),
      expiresIn: Type.String()
    }),
    local: Type.Object({
      usernameField: Type.String(),
      passwordField: Type.String()
    }),
    entity: Type.String(),
    service: Type.String(),
    path: Type.String(),
    oauth: Type.Object({
      google: Type.Object({
        key: Type.String(),
        secret: Type.String(),
        scope: Type.Array(Type.String())
      }),
      github: Type.Object({
        key: Type.String(),
        secret: Type.String(),
        scope: Type.Array(Type.String())
      }),
      auth0: Type.Object({
        key: Type.String(),
        secret: Type.String()
      })
    })
  })
})

export type ApplicationConfiguration = Static<typeof configurationSchema>

export const configurationValidator = getValidator(configurationSchema, dataValidator)
