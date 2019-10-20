let db = require("../models")

let sequelize = {
    Read: (spoonacularID, cb) => {
        db.Nutrients.findAll({
            where:{
                spoonacularID: parseInt(spoonacularID)
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
        db.Nutrients.create({
            calories: obj.calories,
            fat: obj.fat,
            saturatedfat: obj.saturatedfat,
            carbohydrates: obj.carbohydrates,
            sugar: obj.sugar,
            cholesterol: obj.cholesterol,
            sodium: obj.sodium,
            alcohol: obj.alcohol,
            protein: obj.protein,
            k: obj.k,
            a: obj.a,
            manganese: obj.manganese,
            selenium: obj.selenium,
            c: obj.c,
            folate: obj.folate,
            e: obj.e,
            fiber: obj.fiber,
            iron: obj.iron,
            phosphorus: obj.phosphorus,
            calcium: obj.calcium,
            b1: obj.b1,
            b6: obj.b6,
            magnesium: obj.magnesium,
            b3: obj.b3,
            potassium: obj.potassium,
            b2: obj.b2,
            zinc: obj.zinc,
            copper: obj.copper,
            b5: obj.b5
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (id, cb) => {
        db.Nutrients.destroy({
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
        db.Nutrients.update({
            calories: obj.calories,
            fat: obj.fat,
            saturatedfat: obj.saturatedfat,
            carbohydrates: obj.carbohydrates,
            sugar: obj.sugar,
            cholesterol: obj.cholesterol,
            sodium: obj.sodium,
            alcohol: obj.alcohol,
            protein: obj.protein,
            k: obj.k,
            a: obj.a,
            manganese: obj.manganese,
            selenium: obj.selenium,
            c: obj.c,
            folate: obj.folate,
            e: obj.e,
            fiber: obj.fiber,
            iron: obj.iron,
            phosphorus: obj.phosphorus,
            calcium: obj.calcium,
            b1: obj.b1,
            b6: obj.b6,
            magnesium: obj.magnesium,
            b3: obj.b3,
            potassium: obj.potassium,
            b2: obj.b2,
            zinc: obj.zinc,
            copper: obj.copper,
            b5: obj.b5
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