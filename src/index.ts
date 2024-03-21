import { app } from './app'
import { logger } from './logger'

const port = Number(process.env.PORT) || 3001
const host = process.env.API_URL

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
