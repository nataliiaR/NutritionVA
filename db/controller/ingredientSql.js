let db = require("../models")

let sequelize = {
    Read: (id, cb) => {
        db.Ingredient.findAll({
            where:{
                spoonacularID: parseInt(id)
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
        db.Ingredient.create({
            spoonacularID: obj.spoonacularID,
            name: obj.name,
            type: obj.type,
            imageURL: obj.imageURL
        })
        .then(responseBody => {
            console.log("From orm ingredient creation");
            console.log(JSON.stringify(responseBody));
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (req, cb) => {
        db.Ingredient.destroy({
            where:{
                spoonacularID: parseInt(req.params.id)
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
        db.Ingredient.update({
            spoonacularID: obj.spoonacularID,
            name: obj.name,
            type: obj.type,
            imageURL: obj.imageURL
        }, {
          where: {
            spoonacularID: obj.spoonacularID
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