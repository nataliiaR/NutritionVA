'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define('UserSession', {
    sessionUpdated: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
  }, {
    tableName: 'UserSession',
  });
  UserSession.associate = (models) => {
    models.UserSession.belongsTo(models.User, {
        onDelete: "cascade"
      })
  };
  
  return UserSession;
};