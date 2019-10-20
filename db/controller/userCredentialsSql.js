let db = require("../models")

let sequelize = {
    Read: (userID, cb) => {
        db.UserCredentials.findAll({
            where:{
                UserId: parseInt(userID)
            }
        })
        .then((responseBody) => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err)
            cb(err);
        });
    },
    Create: (obj, cb) => {
        db.UserCredentials.create({
            alias: obj.alias,
            password: obj.password,
            userID_FB: obj.userID_FB,
            userName_FB: obj.userName_FB,
            UserId: obj.UserId
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (userId, cb) => {
        db.UserCredentials.destroy({
            where:{
                UserId: parseInt(userId)
            }
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err)
            cb(err)
        });
    },
    Update: (obj, cb) => {
        db.UserCredentials.update({
            alias: obj.alias,
            password: obj.password,
            userID_FB: obj.userID_FB,
            userName_FB: obj.userName_FB,
            UserId: obj.UserId
        }, {
          where: {
            UserId: obj.UserId
          }
        })
        .then(responseBody => {
          cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    }
}

module.exports = sequelize;