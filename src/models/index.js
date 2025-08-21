import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../configs/database.js'
import LogsModel from './logs.model.js'
import IpWhitelistModel from './ipWhitelist.model.js'

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.Logs = LogsModel(sequelize, DataTypes)
db.IpWhitelist= IpWhitelistModel(sequelize, DataTypes)

export default db
