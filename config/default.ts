const config = {
  host: 'localhost',
  port: 3030,
  public: './public/',
  uploads: './uploads/',
  origins: ['http://localhost:3000'],
  paginate: {
    default: 10,
    max: 50
  },
  aws: {
    endpoint: '',
    bucket: '',
    accessKeyId: '',
    secretAccessKey: ''
  },
  mongodb: process.env.MONGO_URI,
  authentication: {
    secret: '',
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
  }
}

export default config
