import { developersAuth } from './middlewares/developersAuth.js'
import { requestLimiter } from './middlewares/requestLimiter.js'
import { errorHandler } from './middlewares/errorHandler.js'
import developersRouter from './routes/developers.routes.js'
import logMiddleware from './middlewares/logMiddleware.js'
import ipWhitelist from './middlewares/ipWhitelist.js'
import requestLogger from './middlewares/requestLogger.js'
import { hmacAuth } from './middlewares/hmacAuth.js'
import logsRouter from './routes/logs.routes.js'
import dayjs from './configs/dayjs.js'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.use(requestLimiter)
app.use(requestLogger)
app.use(ipWhitelist)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'VPC Ticketing API',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timezone: dayjs.tz()['$x']['$timezone']
    })
})

app.use('/developers', developersAuth, developersRouter)
app.use('/logs', developersAuth, logsRouter)

app.use(logMiddleware)
app.use(errorHandler)
app.use(hmacAuth)

app.use('/ping', (req, res) => {
    res.status(200).json({
        message: 'Pong',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        
        timezone: dayjs.tz()['$x']['$timezone']
    })
})

app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

export default app
