// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth'

import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: any, _existingEntity: any, _params: any) {
    const baseData = await super.getEntityData(profile, null, {})

    return {
      ...baseData,
      email: profile.email,
      firstName: profile.family_name,
      lastName: profile.given_name,
      googleId: profile.sub,
      profilePicture: profile.picture
    }
  }
}

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile: any, _existingEntity: any, _params: any) {
    const baseData = await super.getEntityData(profile, null, {})

    return {
      ...baseData,
      email: profile.email || '',
      firstName: profile.name ? profile.name.split(' ')[0] : '',
      lastName: profile.name ? profile.name.split(' ')[1] : '',
      githubId: profile.id,
      profilePicture: profile.avatar_url
    }
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('google', new GoogleStrategy())
  authentication.register('github', new GithubStrategy())
  authentication.register('auth0', new OAuthStrategy())

  app.use('authentication', authentication)
  app.configure(oauth())
}
