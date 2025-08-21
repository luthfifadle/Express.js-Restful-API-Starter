import crypto from 'crypto'
import dayjs from '../configs/dayjs.js'

export const generateHmac = async (dataBody = {}) => {
    const SHARED_SECRET = process.env.DEVELOPERS_KEY
    const timestamp = dayjs().valueOf().toString()
    const body = JSON.stringify(dataBody)
    const payload = `${timestamp}.${body}`

    const signature = crypto
    .createHmac('sha256', SHARED_SECRET)
    .update(payload)
    .digest('hex')

    return {
        signature,
        timestamp,
        body,
    }
}