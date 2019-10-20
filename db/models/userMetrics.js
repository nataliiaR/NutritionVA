'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMetrics = sequelize.define('UserMetrics', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    weight: {
        // Kilograms/Pounds
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    height: {
        // Centimeters/Inches
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    }
  }, {
    tableName: 'UserMetrics',
  });
  UserMetrics.associate = (models) => {
    models.UserMetrics.belongsTo(models.User, {
        onDelete: "cascade"
      })
  };
  
  return UserMetrics;
};