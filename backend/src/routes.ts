import express from 'express'
import superagent from 'superagent'

import { THEMOVIEDB_API_KEY, THEMOVIEDB_URL } from '@config'
import { MovieDBResponse, createPosterUrl } from '@utils'
import cacheFactory from './cache'

const cacheModule = cacheFactory()
const { cache } = cacheModule

const router = express.Router()

type SearchRequestBody = {
  keyword: string
  page: number
}

router.get('/ping', (_, res) => res.send('pong'))

router.post('/search', (req, res, next) => {
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

  const { keyword, page } = req.body as SearchRequestBody

  const url = `${THEMOVIEDB_URL}/search/movie?include_adult=false&language=en-US&query=${keyword}&page=${
    page || 1
  }`

  superagent
    .get(url)
    .set('Authorization', `Bearer ${THEMOVIEDB_API_KEY}`)
    .then((response) => {
      const results = (response.body as MovieDBResponse).results.map((result) => {
        if (!result.poster_path) {
          return result
        }

        return {
          ...result,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          poster_path: createPosterUrl(result.poster_path),
        }
      })
      cache[cacheKey] = { ...response.body, results }
      res.send({ ...response.body, results, fromCache: false })
    })
    .catch(next)
})

router.get('/cache-stats', (_, res) => {
  res.send(cacheModule.stats)
})

export default router
