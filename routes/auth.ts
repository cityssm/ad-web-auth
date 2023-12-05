import { type RequestHandler, Router } from 'express'

import byGet_handler from '../handlers/byGet.js'
import byHeaders_handler from '../handlers/byHeaders.js'
import byPost_handler from '../handlers/byPost.js'
import * as configFunctions from '../helpers/configFunctions.js'

export const router = Router()

if (configFunctions.getProperty('methods.get') !== undefined) {
  router.get('/byGet', byGet_handler as RequestHandler)
}

if (configFunctions.getProperty('methods.headers') !== undefined) {
  router.all('/byHeaders', byHeaders_handler as RequestHandler)
}

if (configFunctions.getProperty('methods.post') !== undefined) {
  router.post('/byPost', byPost_handler as RequestHandler)
}

export default router
