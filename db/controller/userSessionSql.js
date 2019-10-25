let db = require("../models")

let sequelize = {
    Read: (userID, cb) => {
        db.UserSession.findAll({
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
        db.UserSession.create({
            UserId: parseInt(obj.UserID),
            sessionUpdated: Date.now(),
            isActive: true
        })
        .then(responseBody => {
            if (responseBody.UserID)
            {
                cb(responseBody);
            }
        })
        .catch((err) => {
            console.error(err);
            cb(0);
        });
    },
    Delete: (userId, cb) => {
        db.UserSession.destroy({
            where:{
                UserId: parseInt(userId)
            }
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    },
    Update: (obj, cb) => {
        db.UserSession.update({
            sessionUpdated: Date.now(),
            isActive: obj.isActive
        }, {
          where: {
            UserId: parseInt(obj.UserId)
          }
        })
        .then(responseBody => {
          cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    },
}

module.exports = sequelize;