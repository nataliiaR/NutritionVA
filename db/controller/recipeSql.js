let db = require("../models")

let sequelize = {
    Read: (id, cb) => {
        db.Recipe.findAll({
            where:{
                spoonacularID: parseInt(id)
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
        db.Recipe.create({
            spoonacularID: obj.spoonacularID,
            isVegan: obj.isVegan,
            isVegetarian: obj.isVegetarian,
            isGlutenFree: obj.isGlutenFree,
            isDairyFree: obj.isDairyFree,
            isKetogenic: obj.isKetogenic,
            isFODMAP: obj.isFODMAP,
            isWHOLE30: obj.isWHOLE30,
            servings: obj.servings,
            cookMinutes: obj.cookMinutes,
            sourceURL: obj.sourceURL,
            spoonacularURL: obj.spoonacularURL,
            healthScore: obj.healthScore,
            ingredients: obj.ingredients,
            instructions: obj.instructions,
            name: obj.name,
            servings: obj.servings,
            imageURL: obj.imageURL,
            pricePerServing: obj.pricePerServing
        })
        .then(responseBody => {
            console.log("From orm recipe creation");
            console.log(JSON.stringify(responseBody));
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (id, cb) => {
        db.Recipe.destroy({
            where:{
                spoonacularID: parseInt(id)
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
        db.Recipe.update({
            spoonacularID: obj.spoonacularID,
            isVegan: obj.isVegan,
            isVegetarian: obj.isVegetarian,
            isGlutenFree: obj.isGlutenFree,
            isDairyFree: obj.isDairyFree,
            isKetogenic: obj.isKetogenic,
            isFODMAP: obj.isFODMAP,
            isWHOLE30: obj.isWHOLE30,
            servings: obj.servings,
            cookMinutes: obj.cookMinutes,
            sourceURL: obj.sourceURL,
            spoonacularURL: obj.spoonacularURL,
            healthScore: obj.healthScore,
            ingredients: obj.ingredients,
            instructions: obj.instructions,
            name: obj.name,
            servings: obj.servings,
            imageURL: obj.imageURL,
            pricePerServing: obj.pricePerServing
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