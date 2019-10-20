let db = require("../models")

let sequelize = {
    Read: (id, cb) => {
        db.UserMetrics.findAll({
            where:{
                id: parseInt(id)
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
        db.UserMetrics.create({
            weight: obj.weight,
            height: obj.height,
            gender: obj.gender,
            type: obj.type,
            UserId: obj.UserId
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (req, cb) => {
        db.UserMetrics.destroy({
            where:{
                UserId: parseInt(req.params.id)
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
        db.UserMetrics.update({
            weight: obj.weight,
            height: obj.height,
            gender: obj.gender,
            type: obj.type,
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