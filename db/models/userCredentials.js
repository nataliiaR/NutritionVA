'use strict';
const encryption = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
 const UserCredentials = sequelize.define('UserCredentials', {
   alias: {
       type: DataTypes.STRING,
       allowNull: true,
       validate: {
           notEmpty: true
       }
   },
   password: {
       type: DataTypes.STRING,
       allowNull: true,
       validate: {
           notEmpty: true
       }
   },
   userID_FB: {
       type: DataTypes.INTEGER,
       allowNull: true,
       validate: {
           notEmpty: true
       }
   },
   userName_FB: {
       type: DataTypes.STRING,
       allowNull: true,
       validate: {
         notEmpty: true
       }
   }
 }, {
   tableName: 'UserCredentials',
   instanceMethods: {
       generateHash(password)
       {
           return encryption.hash(password, bcrypt.genSaltSync(8));
       },
       isValidPW(password) {
           return bcrypt.compare(password, this.password);
       }
   }
 });
 UserCredentials.associate = (models) => {
   models.UserCredentials.belongsTo(models.User,{
    onDelete: "cascade"
   })
 };
 return UserCredentials;
};
