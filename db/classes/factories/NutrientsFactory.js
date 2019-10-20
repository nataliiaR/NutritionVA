const Nutrients = require("../Nutrients");
const sql = require("../../ORM/nutrientsSql");
const Spoonacular = require("../../api/spoonacular");

let interface = {
    assembly: {
        recipeID: null,
        calories: null,
        fat: null,
        saturatedfat: null,
        carbohydrates: null,
        sugar: null,
        cholesterol: null,
        sodium: null,
        alcohol: null,
        protein: null,
        k: null,
        a: null,
        manganese: null,
        selenium: null,
        c: obj.c,
        folate: null,
        e: null,
        fiber: null,
        iron: null,
        phosphorus: null,
        calcium: null,
        b1: null,
        b6: null,
        magnesium: null,
        b3: null,
        potassium: null,
        b2: null,
        zinc: null,
        copper: null,
        b5: null
    },
    Create:(id, cb) => {
       if (parseInt(id))
       {
            interface.getAPINutrients(id, (responseObj) =>{
                interface.assembly.recipeID = id;
                interface.assembly.calories = responseObj.calories;
                interface.assembly.fat = responseObj.fat;
                interface.assembly.saturatedfat = responseObj.saturatedfat;
                interface.assembly.carbohydrates = responseObj.carbs;
                interface.assembly.sugar = responseObj.bad.filter(n => n.title === "Sugar")[0].amount;
                interface.assembly.cholesterol = responseObj.bad.filter(n => n.title === "Cholesterol")[0].amount;
                interface.assembly.sodium = responseObj.bad.filter(n => n.title === "Sodium")[0].amount;
                interface.assembly.alcohol = responseObj.bad.filter(n => n.title === "Alcohol")[0].amount;
                interface.assembly.protein = responseObj.bad.filter(n => n.title === "Protein")[0].amount;
                interface.assembly.k = responseObj.bad.filter(n => n.title === "Vitamin K")[0].amount;
                interface.assembly.a = responseObj.bad.filter(n => n.title === "Vitamin A")[0].amount;
                interface.assembly.manganese = responseObj.bad.filter(n => n.title === "Manganese")[0].amount;
                interface.assembly.selenium = responseObj.bad.filter(n => n.title === "Selenium")[0].amount;
                interface.assembly.c = responseObj.bad.filter(n => n.title === "Vitamin C")[0].amount;
                interface.assembly.folate = responseObj.bad.filter(n => n.title === "Folate")[0].amount;
                interface.assembly.e = responseObj.bad.filter(n => n.title === "Vitamin E")[0].amount;
                interface.assembly.fiber = responseObj.bad.filter(n => n.title === "Fiber")[0].amount;
                interface.assembly.iron = responseObj.bad.filter(n => n.title === "Iron")[0].amount;
                interface.assembly.phosphorus = responseObj.bad.filter(n => n.title === "Phosphprus")[0].amount;
                interface.assembly.calcium = responseObj.bad.filter(n => n.title === "Calcium")[0].amount;
                interface.assembly.b1 = responseObj.bad.filter(n => n.title === "Vitamin B1")[0].amount;
                interface.assembly.b6 = responseObj.bad.filter(n => n.title === "Vitamin B6")[0].amount;
                interface.assembly.magnesium = responseObj.bad.filter(n => n.title === "Magnesium")[0].amount;
                interface.assembly.b3 = responseObj.bad.filter(n => n.title === "Vitamin B3")[0].amount;
                interface.assembly.potassium = responseObj.bad.filter(n => n.title === "Potassium")[0].amount;
                interface.assembly.b2 = responseObj.bad.filter(n => n.title === "Vitamin B2")[0].amount;
                interface.assembly.zinc = responseObj.bad.filter(n => n.title === "Zinc")[0].amount;
                interface.assembly.copper = responseObj.bad.filter(n => n.title === "Copper")[0].amount;
                interface.assembly.b5 = responseObj.bad.filter(n => n.title === "Vitamin B5")[0].amount;
            })
            
            try
            {
                interface.assemble((obj) => {
                    cb(obj);
                });
            }
            catch
            {
                console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`);
                cb(0);
            }
       }
       else
       {
          console.log(`Ingredient Factory Recieved invalid object; ${obj}`)
          cb(0)
       }
    },
    Retrieve:(id, cb) => {
        if (typeof parseInt(id) === 'number')
        {
            sql.Read(parseInt(id), (sqlModel) => {
                interface.assembly.recipeID = sqlModel.spoonacularID,
                interface.assembly.calories = sqlModel.calories,
                interface.assembly.fat = sqlModel.fat,
                interface.assembly.saturatedfat = sqlModel.saturatedfat,
                interface.assembly.carbohydrates = sqlModel.carbohydrates,
                interface.assembly.sugar = sqlModel.sugar,
                interface.assembly.cholesterol = sqlModel.cholesterol,
                interface.assembly.sodium = sqlModel.sodium,
                interface.assembly.alcohol = sqlModel.alcohol,
                interface.assembly.protein = sqlModel.protein,
                interface.assembly.k = sqlModel.k,
                interface.assembly.a = sqlModel.a,
                interface.assembly.manganese = sqlModel.manganese,
                interface.assembly.selenium = sqlModel.selenium,
                interface.assembly.c = sqlModel.c,
                interface.assembly.folate = sqlModel.folate,
                interface.assembly.e = sqlModel.e,
                interface.assembly.fiber = sqlModel.fiber,
                interface.assembly.iron = sqlModel.iron,
                interface.assembly.phosphorus = sqlModel.phosphorus,
                interface.assembly.calcium = sqlModel.calcium,
                interface.assembly.b1 = sqlModel.b1,
                interface.assembly.b6 = sqlModel.b6,
                interface.assembly.magnesium = sqlModel.magnesium,
                interface.assembly.b3 = sqlModel.b3,
                interface.assembly.potassium = sqlModel.potassium,
                interface.assembly.b2 = sqlModel.b2,
                interface.assembly.zinc = sqlModel.zinc,
                interface.assembly.copper = sqlModel.copper,
                interface.assembly.b5 = sqlModel.b5
            });
            
            try
            {
                interface.assemble((obj) => {
                    cb(obj);
                });
            }
            catch
            {
                console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`);
                cb(0);
            }
        }
        else
        {
           console.log(`Create User Profile Get Request Body Does not Contain User Object`)
           cb(0)
        }
    },
    getAPINutrients: (id, cb) => {
        Spoonacular.getNutrients(id, (responseObj) => {
            responseObj.meals ? (interface.assembly.responses.push(responseObj),cb(responseObj)) : cb(null)
        });
    },
    
    assemble:(cb) => {
        let concreteObj = new Nutrients(interface.assembly);
        cb(concreteObj)
    }
}

module.exports = interface;