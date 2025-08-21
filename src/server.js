import app from './app.js'
import sequelize from './configs/database.js'

const URL = process.env.APP_URL || 'http://localhost'
const PORT = process.env.APP_PORT || 3000

sequelize.sync({ alter: true }).then(() => { // set alter to true for development, false for production
    console.info('✅ Database connected successfully')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${URL}:${PORT}`)
    })
}).catch(error => {
    console.error('❌ Database connection failed')
    console.error(error)
})
