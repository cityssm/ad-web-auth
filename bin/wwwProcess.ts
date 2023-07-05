/* eslint-disable no-process-exit, unicorn/no-process-exit */

import * as http from 'node:http'

import { app } from '../app.js'
import * as configFunctions from '../helpers/configFunctions.js'

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
    // eslint-disable-next-line no-fallthrough
    case 'EACCES': {
      console.error('Requires elevated privileges')
      process.exit(1)
      // break
    }

    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE': {
      console.error('Port is already in use.')
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
    console.log('HTTP listening on ' + httpPort.toString())
  })
}
