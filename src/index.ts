import { app } from './app'
import { logger } from './logger'

const port = app.get('port') || 3001

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers application started on http://${app.get('host')}:${app.get('port')}`)
})
