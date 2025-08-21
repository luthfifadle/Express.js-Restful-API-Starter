import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        },
        logging: false,
        timezone: '+07:00',
    }
)

export default sequelize