let db = require("../models")

let sequelize = {
    Read: (userID, cb) => {
        db.UserSchedule.findAll({
            where:{
                UserId: parseInt(userID)
            }
        })
        .then((responseBody) => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    },
    Create: (obj, cb) => {
        db.UserSchedule.create({
            schedule: obj.schedule,
            recipeIDs: obj.recipeIDs,
            UserId: obj.UserId,
        })
        .then(responseBody => {
            console.log('\x1b[36m%s\x1b[0m',"From user schedule Orm")
            console.log('\x1b[36m%s\x1b[0m', JSON.stringify(responseBody))
            cb(responseBody);
        })
        .catch((err) => {
            console.error(err);
            cb(err);
        });
    },
    Delete: (userId, cb) => {
        db.UserSchedule.destroy({
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
        db.UserSchedule.update({
            schedule: obj.schedule,
            recipeIDs: obj.recipeIDs,
            UserId: obj.UserIdr,
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