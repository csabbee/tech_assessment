/*eslint-disable @typescript-eslint/no-floating-promises*/
import assert from 'node:assert'
import { describe, it } from 'node:test'
import { TEST } from './cache'

describe('Cache test', () => {
  it('Should run', () => {
    assert.strictEqual(TEST, 5000)
  })
})
