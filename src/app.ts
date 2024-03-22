// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import * as dotenv from 'dotenv'
dotenv.config()

import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { mongodb } from './mongodb'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'

const app: Application = express(feathers())

if (process.env.MONGO_URI) {
  app.set('mongodb', process.env.MONGO_URI)
}

if (
  process.env.AWS_ENDPOINT &&
  process.env.AWS_BUCKET &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
) {
  app.set('aws', {
    endpoint: process.env.AWS_ENDPOINT,
    bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
}

if (process.env.HOST) {
  app.set('host', process.env.HOST)
}

if (process.env.PUBLIC_FOLDER) {
  app.set('public', process.env.PUBLIC_FOLDER)
}

if (
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET &&
  process.env.JWT_SECRET &&
  process.env.GOOGLE_KEY &&
  process.env.GOOGLE_SECRET
) {
  app.set('authentication', {
    secret: process.env.JWT_SECRET,
    authStrategies: ['jwt', 'local', 'oauth'],
    jwtOptions: {
      header: {
        typ: 'access'
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    entity: 'user',
    service: 'users',
    path: '/authentication',
    oauth: {
      google: {
        key: process.env.GOOGLE_KEY,
        secret: process.env.GOOGLE_SECRET,
        scope: ['email', 'profile']
      },
      github: {
        key: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['user:email', 'user', 'gist']
      },
      auth0: {
        key: '<Client ID>',
        secret: '<Client secret>'
      }
    }
  })
}

// Load app configuration
app.configure(configuration(configurationValidator))

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(mongodb)
app.configure(authentication)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
