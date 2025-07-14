// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-process-exit */

import * as http from 'node:http'

import Debug from 'debug'

import { app } from '../app.js'
import { DEBUG_NAMESPACE } from '../debug.config.js'
import * as configFunctions from '../helpers/configFunctions.js'

const debug = Debug(`${DEBUG_NAMESPACE}:wwwProcess:${process.pid}`)

interface ServerError extends Error {
  syscall: string
  code: string
}

function onError(error: ServerError): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      debug('Requires elevated privileges')
      process.exit(1)
      // break
    }

    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE': {
      debug('Port is already in use.')
      process.exit(1)
      // break
    }

    // eslint-disable-next-line no-fallthrough
    default: {
      throw error
    }
  }
}

/**
 * Initialize HTTP
 */

const httpPort = configFunctions.getProperty('ports.http')

if (httpPort !== undefined) {
  const httpServer = http.createServer(app)

  httpServer.listen(httpPort)

  httpServer.on('error', onError)
  httpServer.on('listening', function () {
    debug(`HTTP listening on ${httpPort.toString()}`)
  })
}
