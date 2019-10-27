'use strict';
const encryption = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
 const UserCredentials = sequelize.define('UserCredentials', {
   email: {
       type: DataTypes.STRING,
       allowNull: true
   },
   password: {
       type: DataTypes.STRING,
       allowNull: true
   },
   userID_FB: {
       type: DataTypes.INTEGER,
       allowNull: true
   },
   userName_FB: {
       type: DataTypes.STRING,
       allowNull: true
   },
   last_login: {
       type: sequelize.DATE,
       allowNull: true
   },
 }, {
   tableName: 'UserCredentials',
   instanceMethods: {
       generateHash(password){
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
