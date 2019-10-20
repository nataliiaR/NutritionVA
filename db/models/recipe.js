'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    spoonacularID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
          isNumeric: true
      }
    },
    isVegan: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isVegetarian: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isGlutenFree: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isDairyFree: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isKetogenic: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isFODMAP: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isWHOLE30: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    servings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
          len: [0, 10000],
          isNumeric: true
      }
    },
    cookMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
          len: [0, 10000],
          isNumeric: true
      }
    },
    sourceURL: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      validate: {
          isUrl: true
      }
    },
    spoonacularURL: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      validate: {
          isUrl: true
      }
    },
    pricePerServing: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0, 
        max: 100
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function(value) {
        return this.getDataValue('ingredients', value.split(','));
      },
      set: function(value) {
          this.setDataValue('ingredients', value.join(','));
      }
  },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    servings: {
      type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 0, 
            max: 50,
            isNumeric: true
        }
    },
    imageURL: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {});
  return Recipe;
};