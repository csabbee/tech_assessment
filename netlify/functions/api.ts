import express from 'express'
import serverless from 'serverless-http'
import routes from '../../src/routes'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(routes)

export const handler = serverless(app)
