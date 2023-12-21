import { NDOE_ENV, PORT } from '@config'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

import routes from './routes'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(routes)

if (NDOE_ENV === 'dev') {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })
  )
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
