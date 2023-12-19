import { CACHE_INVALIDATION } from './config'

const allTimeCacheHitCountSymbol = Symbol('allTimeCacheHitCount')
const allTimeTryCountSymbol = Symbol('allTimeTry')
const cacheHitCountSymbol = Symbol('cacheHitCount')

export type CacheModule = {
  cache: Record<string | symbol, unknown>
  stats: {
    hitCount: number
    allTimeHitCount: number
    allTimeTryCount: number
  }
}

const cacheFactory = (): CacheModule => {
  const cache = {}
  Object.defineProperty(cache, cacheHitCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  Object.defineProperty(cache, allTimeCacheHitCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  Object.defineProperty(cache, allTimeTryCountSymbol, {
    value: 0,
    enumerable: false,
    writable: true,
  })
  const cacheStatProps = [allTimeTryCountSymbol, allTimeCacheHitCountSymbol, cacheHitCountSymbol]

  // TODO: method to invalidate whole cache
  const handler: ProxyHandler<Record<string | symbol, unknown>> = {
    get(target, prop) {
      if (cacheStatProps.includes(prop as symbol)) {
        return target[prop]
      }

      target[allTimeTryCountSymbol] = Number(target[allTimeTryCountSymbol]) + 1
      if (target[prop] === undefined) {
        target[cacheHitCountSymbol] = 0
      } else {
        target[cacheHitCountSymbol] = Number(target[cacheHitCountSymbol]) + 1
        target[allTimeCacheHitCountSymbol] = Number(target[allTimeCacheHitCountSymbol]) + 1
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
        allTimeHitCount: proxy[allTimeCacheHitCountSymbol] as number,
        allTimeTryCount: proxy[allTimeTryCountSymbol] as number,
      }
    },
  }
}

export default cacheFactory
