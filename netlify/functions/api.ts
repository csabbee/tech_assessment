import routes from 'backend/src/routes'
import express from 'express'
import serverless from 'serverless-http'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(routes)

export const handler = serverless(app)
