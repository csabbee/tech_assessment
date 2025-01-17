import 'dotenv/config'
import * as process from 'process'

export const NDOE_ENV = process.env.NODE_ENV || 'dev'
export const PORT = process.env.PORT || 3000
export const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB_API_KEY || 'testing'
export const THEMOVIEDB_URL = process.env.THEMOVIEDB_URL || 'https://api.themoviedb.org/3'
export const THEMOVIEDB_IMAGE_URL = process.env.THEMOVIEDB_IMAGE_URL || 'https://image.tmdb.org/t/p'
export const CACHE_INVALIDATION = Number(process.env.CACHE_INVALIDATION) || 2000
export const CLIENT = process.env.CLIENT || 'localhost'
