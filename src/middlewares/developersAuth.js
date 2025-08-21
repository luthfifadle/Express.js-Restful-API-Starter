import { error } from "../utils/response.js"

export const developersAuth = (req, res, next) => {
    const developersKey = req.headers['x-developers-key']

    if (!developersKey) {
        return error(res, 'Developers key is required', 400)
    }

    if (developersKey !== process.env.DEVELOPERS_KEY) {
        return error(res, 'Invalid developers key', 403)
    }

    next()
}