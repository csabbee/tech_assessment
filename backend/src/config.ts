import 'dotenv/config'

export const PORT = process.env.PORT || 3000
export const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB_API_KEY || 'testing'
export const CACHE_INVALIDATION = Number(process.env.CACHE_INVALIDATION) || 2000
