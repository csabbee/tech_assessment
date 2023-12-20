import 'dotenv/config'

export const PORT = process.env.PORT || 3000
export const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB_API_KEY || 'testing'
export const THEMOVIEDB_URL = process.env.THEMOVIEDB_URL || 'https://api.themoviedb.org/3'
export const CACHE_INVALIDATION = Number(process.env.CACHE_INVALIDATION) || 2000
