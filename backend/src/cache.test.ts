/*eslint-disable @typescript-eslint/no-floating-promises*/
import assert from 'node:assert'
import { after as afterAll, before as beforeAll, beforeEach, describe, it, mock } from 'node:test'
import cacheFactory, { CacheModule } from './cache'
import { CACHE_INVALIDATION } from './config'
const cacheInvalidation = Number(CACHE_INVALIDATION)

describe('Cache tests', () => {
  let cacheModule: CacheModule
  beforeAll(() => {
    mock.timers.enable(['setTimeout'])
  })
  afterAll(() => {
    mock.reset()
  })
  beforeEach(() => {
    cacheModule = cacheFactory()
  })

  describe('invalidation', () => {
    it('Should delete the given property and only the given property after the cacheModule invalidation time passes', () => {
      const { cache } = cacheModule
      cache.testProp = 'some text'
      // advance the time a bit
      mock.timers.tick(cacheInvalidation / 2)
      cache.anotherTestProp = 1234

      mock.timers.tick(cacheInvalidation / 2)

      assert.strictEqual(cache.testProp, undefined)
      assert.strictEqual(cache.anotherTestProp, 1234)
    })
  })

  describe('cacheModule statistics', () => {
    it('Should increment the all time try count whenever we are trying to access something in the cacheModule', () => {
      const { cache } = cacheModule
      assert.strictEqual(cacheModule.stats.allTimeTryCount, 0)

      cache.b = cache.a
      cache.b = cache.a
      cache.b = cache.a
      cache.b = cache.a

      assert.strictEqual(cacheModule.stats.allTimeTryCount, 4)
    })

    it('Should increment hit count when we are trying to access something that is in the cache', () => {
      const { cache } = cacheModule
      assert.strictEqual(cacheModule.stats.hitCount, 0)

      cache.thisIsAHit = 'hit'

      cache.b = cache.thisIsAHit
      cache.b = cache.thisIsAHit
      cache.b = cache.thisIsAHit

      assert.strictEqual(cacheModule.stats.hitCount, 3)
    })

    it('Should set the hit count to zero, but keep the all time hit count, when we are trying to access something that is not in the cache', () => {
      const { cache } = cacheModule
      assert.strictEqual(cacheModule.stats.hitCount, 0)

      cache.thisIsAHit = 'hit'

      cache.b = cache.thisIsAHit
      assert.strictEqual(cacheModule.stats.hitCount, 1)

      cache.c = cache.thisIsNotAHit
      assert.strictEqual(cacheModule.stats.hitCount, 0)
      assert.strictEqual(cacheModule.stats.allTimeHitCount, 1)
    })
  })
})
