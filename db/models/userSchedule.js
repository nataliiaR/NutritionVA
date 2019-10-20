'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSchedule = sequelize.define('UserSchedule', {
    schedule: {
        type: DataTypes.TEXT,
        allowNull: false,
        get: function() {
            return JSON.parse(this.getDataValue("schedule"));
        },
        set: function(value) {
            this.setDataValue("schedule", JSON.stringify(value));
        }
    },
    recipeIDs: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function(value) {
        return this.getDataValue('recipeIDs', value.split(','));
      },
      set: function(value) {
          this.setDataValue('recipeIDs', value.join(','));
      }
    }
  }, {
    tableName: 'UserSchedules',
  });
  UserSchedule.associate = (models) => {
    models.UserSchedule.belongsTo(models.User, {
        onDelete: "cascade",
      })
  };
  
  return UserSchedule;
};