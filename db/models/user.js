'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        defaultValue: "Anonymous",
        validate: {
            isAlphanumeric: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: "Anonymous",
        validate: {
            isAlphanumeric: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    dob: {
        // DATETIME for mysql
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAlphanumeric: true
        }
    },
    currentMetricsID:
    {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    currentDietConfigID:
    {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    }
  }, {
    tableName: 'Users',
  });
  User.associate = (models) => {
    models.User.hasOne(models.UserCredentials);
    models.User.hasOne(models.UserSchedule);
    models.User.hasMany(models.UserMetrics);
    models.User.hasMany(models.DietConfig);
  };
  
  return User;
};
