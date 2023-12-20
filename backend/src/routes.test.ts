/*eslint-disable @typescript-eslint/no-floating-promises*/
import { THEMOVIEDB_IMAGE_URL } from '@config'
import mockResponse from '@mock/mock-response'
import mockConfig from '@mock/superagent-mock-config'
import { MovieDBResponse } from '@utils'
import express from 'express'
import assert from 'node:assert'
import { after as afterAll, describe, it } from 'node:test'
import superagent from 'superagent'
import superagentMock from 'superagent-mock'
import supertest from 'supertest'
import routes from './routes'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const configuredMock = superagentMock(superagent, mockConfig)

const app = express()
app.use(express.json())
app.use(routes)

describe('routes module', () => {
  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    configuredMock.unset()
  })

  describe('ping', () => {
    it('Should return pong', async () => {
      const response = await supertest(app).get('/ping').expect(200)

      assert.strictEqual(response.text, 'pong')
    })
  })

  // TODO: Fix hanging test
  describe('search', () => {
    it('Should return the modified poster_path', async () => {
      const response = await supertest(app)
        .post('/search')
        .send({ keyword: 'testing', page: 1 })
        .expect(200)

      const responseBody = response.body as MovieDBResponse
      assert.strictEqual(
        responseBody.results[0].poster_path,
        `${THEMOVIEDB_IMAGE_URL}/w92${mockResponse.poster_path}`
      )
    })
  })
})
