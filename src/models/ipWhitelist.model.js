export default (sequelize, DataTypes) => {
  const IpWhitelist = sequelize.define('IpWhitelist', {
    ip_address: DataTypes.STRING,
    state: DataTypes.BOOLEAN,
    description: DataTypes.STRING
  }, {
    tableName: 'ip_whitelist'
  })

  return IpWhitelist
}
