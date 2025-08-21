export default (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
     level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    method: DataTypes.STRING,
    path: DataTypes.TEXT,
    status_code: DataTypes.INTEGER,
    request_body: DataTypes.TEXT,
    response_body: DataTypes.TEXT,
    user_id: DataTypes.BIGINT,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.TEXT,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'logs'
  })

  return Logs
}
