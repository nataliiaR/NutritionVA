'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nutrients = sequelize.define('Nutrients', {
    calories: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    fat: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    saturatedfat: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    carbohydrates: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    sugar: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    cholesterol: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    sodium: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    alcohol: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    protein: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    k: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    a: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    manganese: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    selenium: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    c: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    folate: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    e: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    fiber: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    iron: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    phosphorus: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    calcium: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    b1: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    b6: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    magnesium: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    b3: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    potassium: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    b2: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    zinc: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    copper: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    b5: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    }
  }, {
    tableName: 'Nutrients'
  });
  Nutrients.associate = (models) => {
    models.Nutrients.belongsTo(models.Recipe, {
        onDelete: "cascade"
      })
  };
  return Nutrients;
};