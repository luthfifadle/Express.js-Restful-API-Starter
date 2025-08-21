import db from '../models/index.js'

const ipWhitelist = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress
    const whitelisted = await db.IpWhitelist.findOne({ where: { ip_address: ip, state: true } })
    
    if (!whitelisted) {
        return res.status(403).json({ error: 'Forbidden' })
    }
    
    next()
}

export default ipWhitelist