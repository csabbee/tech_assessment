import { CACHE_INVALIDATION } from '@config'

const sumCacheHitCountSymbol = Symbol('allTimeCacheHitCount')
const sumTryCountSymbol = Symbol('allTimeTry')
const cacheHitCountSymbol = Symbol('cacheHitCount')

export type CacheModule = {
  cache: Record<string | symbol, unknown>
  stats: {
    hitCount: number
    sumHitCount: number
    sumTryCount: number
  }
}

const cacheFactory = (): CacheModule => {
  const cache = {}
  Object.defineProperty(cache, cacheHitCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  Object.defineProperty(cache, sumCacheHitCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  Object.defineProperty(cache, sumTryCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  const cacheStatProps = [sumTryCountSymbol, sumCacheHitCountSymbol, cacheHitCountSymbol]

  // TODO: method to invalidate whole cache
  const handler: ProxyHandler<Record<string | symbol, unknown>> = {
    get(target, prop) {
      if (cacheStatProps.includes(prop as symbol)) {
        return target[prop]
      }

      target[sumTryCountSymbol] = Number(target[sumTryCountSymbol]) + 1
      if (target[prop] === undefined) {
        target[cacheHitCountSymbol] = 0
      } else {
        target[cacheHitCountSymbol] = Number(target[cacheHitCountSymbol]) + 1
        target[sumCacheHitCountSymbol] = Number(target[sumCacheHitCountSymbol]) + 1
      }
      return target[prop]
    },
    set(obj, prop, value) {
      if (obj[prop]) {
        return true
      }
      setTimeout(() => {
        delete obj[prop]
      }, CACHE_INVALIDATION)
      obj[prop] = value
      return true
    },
  }

  const proxy = new Proxy(cache, handler)

  return {
    cache: proxy,
    get stats() {
      return {
        hitCount: proxy[cacheHitCountSymbol] as number,
        sumHitCount: proxy[sumCacheHitCountSymbol] as number,
        sumTryCount: proxy[sumTryCountSymbol] as number,
      }
    },
  }
}

export default cacheFactory
