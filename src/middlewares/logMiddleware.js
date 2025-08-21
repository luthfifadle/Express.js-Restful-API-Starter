import db from '../models/index.js'
import dayjs from '../configs/dayjs.js'

const logMiddleware = async (req, res, next) => {
  const start = dayjs().format('YYYY-MM-DD HH:mm:ss')

  res.on('finish', async () => {
    const duration = dayjs().format('YYYY-MM-DD HH:mm:ss') - start

    await db.Logs.create({
      level: 'http',
      message: `${req.method} ${req.originalUrl}`,
      method: req.method,
      path: req.originalUrl,
      status_code: res.statusCode,
      request_body: JSON.stringify(req.body),
      response_body: res.locals.responseData ? JSON.stringify(res.locals.responseData) : null,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
  })

  next()
}

export default logMiddleware
