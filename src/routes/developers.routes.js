import express from 'express'
import { generateHmac } from '../utils/developers.js'
import { success, error } from '../utils/response.js'

const router = express.Router()

router.post('/hmac/create', async (req, res) => {
    const createHmac = await generateHmac(req.body)

    return success(res, createHmac, 200, 'HMAC created successfully')
})

export default router