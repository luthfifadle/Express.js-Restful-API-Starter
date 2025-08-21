import crypto from 'crypto'
import dayjs from '../configs/dayjs.js'

const SHARED_SECRET = process.env.HMAC_SECRET_DEV || 'd3VvM000dEE!@2025'
const TIME_WINDOW = 2 * 60 * 1000 // 2 menit (ms)

export const hmacAuth = (req, res, next) => {
  const signature = req.headers['x-signature']
  const timestamp = req.headers['x-timestamp']

  if (!signature || !timestamp) {
    return res.status(401).json({ message: 'Missing signature or timestamp' })
  }

  const now = dayjs().valueOf().toString()
  const requestTime = parseInt(timestamp)

  console.log(Math.abs(now - requestTime))
  console.log(TIME_WINDOW)
  if (Math.abs(now - requestTime) > TIME_WINDOW) {
    return res.status(408).json({ message: 'Request expired' })
  }

  const rawBody = JSON.stringify(req.body || {})
  const payload = `${timestamp}.${rawBody}`

  const expectedSignature = crypto
    .createHmac('sha256', SHARED_SECRET)
    .update(payload)
    .digest('hex')

  if (signature !== expectedSignature) {
    return res.status(403).json({ message: 'Invalid signature' })
  }

  next()
}
