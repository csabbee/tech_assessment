/*eslint-disable @typescript-eslint/no-floating-promises*/
import mockConfig from '@mock/superagent-mock-config'
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

describe('routes module', { timeout: 1000 }, () => {
  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    configuredMock.unset()
  })

  describe('ping', () => {
    it('Should return pong', (_, done) => {
      supertest(app)
        .get('/ping')
        .expect(200)
        .then((res) => {
          assert.strictEqual(res.text, 'pong')
          done()
        })
    })
  })
})
