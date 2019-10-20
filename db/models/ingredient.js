'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    spoonacularID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            isNumeric: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    imageURL: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
  }, {
    tableName: 'Ingredients'
  });
  
  return Ingredient;
};