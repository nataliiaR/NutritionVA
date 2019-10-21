let db = require("../../models")

let sequelize = {
    Read: (id, cb) => {
        db.DietConfig.findAll({
            where:{
                UserId: parseInt(id)
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
        db.DietConfig.create({
            calorieTarget: obj.calorieTarget,
            proteinTarget: obj.proteinTarget,
            carbTarget: obj.carbTarget,
            fatTarget: obj.fatTarget,
            diet: obj.diet,
            exclusionList: obj.exclusionList,
            UserId: obj.UserId
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (id, cb) => {
        db.DietConfig.destroy({
            where:{
                UserId: parseInt(id)
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
        db.DietConfig.update({
            calorieTarget: obj.calorieTarget,
            proteinTarget: obj.proteinTarget,
            carbTarget: obj.carbTarget,
            fatTarget: obj.fatTarget,
            diet: obj.diet,
            exclusionList: obj.exclusionList,
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