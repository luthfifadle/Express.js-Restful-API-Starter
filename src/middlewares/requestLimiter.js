import rateLimit from "express-rate-limit"

export const requestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
})