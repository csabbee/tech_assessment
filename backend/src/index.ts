import { PORT } from '@config'
import express from 'express'

import routes from './routes'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
