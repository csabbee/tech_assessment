import express from 'express'
import superagent from 'superagent'

import cacheFactory from './cache'
import { THEMOVIEDB_API_KEY, THEMOVIEDB_URL } from './config'

const cacheModule = cacheFactory()
const { cache } = cacheModule

const router = express.Router()

type SearchRequestBody = {
  keyword: string
  page: number
}

router.get('/ping', (_, res) => res.send('pong'))

router.get('/search', (req, res, next) => {
  const cacheKey = JSON.stringify(req.body)
  const cacheEntry = cache[cacheKey]
  if (cacheEntry !== undefined) {
    if (typeof cacheEntry === 'object') {
      res.send({ ...cacheEntry, fromCache: true })
      return
    }
    res.send({})
    return
  }

  const body = req.body as SearchRequestBody

  const url = `${THEMOVIEDB_URL}/search/movie?include_adult=false&language=en-US&query=${
    body.keyword
  }&page=${body.page || 1}`

  superagent
    .get(url)
    .set('Authorization', `Bearer ${THEMOVIEDB_API_KEY}`)
    .then((response) => {
      cache[cacheKey] = response.body
      res.send({ ...response.body, fromCache: false })
    })
    .catch(next)
})

router.get('/cache-stats', (_, res) => {
  res.send(cacheModule.stats)
})

export default router
