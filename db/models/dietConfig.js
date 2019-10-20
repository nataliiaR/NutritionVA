'use strict';
module.exports = (sequelize, DataTypes) => {
  const DietConfig = sequelize.define('DietConfig', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    calorieTarget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0, 
            max: 100000,
            isNumeric: true
        }
    },
    proteinTarget: {
        type: DataTypes.INTEGER,
        defaultValue: 90,
        validate: {
            min: 0, 
            max: 200,
            isNumeric: true
        }
    },
    carbTarget: {
        type: DataTypes.INTEGER,
        defaultValue: 250,
        validate: {
            min: 0, 
            max: 500,
            isNumeric: true
        }
    },
    fatTarget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0, 
            max: 10000,
            isNumeric: true
        }
    },
    diet: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    exclusionList: {
        // Comma Seperated String
        type: DataTypes.TEXT,
        allowNull: true
    }
  }, {
    tableName: 'dietConfigs'
  });
  DietConfig.associate = (models) => {
    models.DietConfig.belongsTo(models.User, {
        onDelete: "cascade"
      })
  };
  return DietConfig;
};