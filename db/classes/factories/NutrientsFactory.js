const Nutrients = require("../Nutrients");
const sql = require("../../controller/nutrientsSql");
const Spoonacular = require("../../../api/spoonacular");

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
        c: null,
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
            Spoonacular.getAPINutrients(id, (responseObj) => {
                interface.assembly.recipeID = id;
                interface.assembly.calories = responseObj.calories;
                interface.assembly.fat = responseObj.fat;
                interface.assembly.protein = responseObj.protein;
                interface.assembly.carbohydrates = responseObj.carbs;
                interface.assembly.sugar = responseObj.bad.filter(n => n.title === "Sugar")[0].amount;
                interface.assembly.cholesterol = responseObj.bad.filter(n => n.title === "Cholesterol")[0].amount;
                interface.assembly.sodium = responseObj.bad.filter(n => n.title === "Sodium")[0].amount;
                interface.assembly.alcohol = responseObj.bad.filter(n => n.title === "Alcohol")[0].amount;
                interface.assembly.saturatedfat = responseObj.bad.filter(n => n.title === "Saturated Fat")[0].amount;
                interface.assembly.k = responseObj.good.filter(n => n.title === "Vitamin K")[0].amount;
                interface.assembly.a = responseObj.good.filter(n => n.title === "Vitamin A")[0].amount;
                interface.assembly.manganese = responseObj.good.filter(n => n.title === "Manganese")[0].amount;
                interface.assembly.selenium = responseObj.good.filter(n => n.title === "Selenium")[0].amount;
                interface.assembly.c = responseObj.good.filter(n => n.title === "Vitamin C")[0].amount;
                interface.assembly.folate = responseObj.good.filter(n => n.title === "Folate")[0].amount;
                interface.assembly.e = responseObj.good.filter(n => n.title === "Vitamin E")[0].amount;
                interface.assembly.fiber = responseObj.good.filter(n => n.title === "Fiber")[0].amount;
                interface.assembly.iron = responseObj.good.filter(n => n.title === "Iron")[0].amount;
                interface.assembly.phosphorus = responseObj.good.filter(n => n.title === "Phosphprus")[0].amount;
                interface.assembly.calcium = responseObj.good.filter(n => n.title === "Calcium")[0].amount;
                interface.assembly.b1 = responseObj.good.filter(n => n.title === "Vitamin B1")[0].amount;
                interface.assembly.b6 = responseObj.good.filter(n => n.title === "Vitamin B6")[0].amount;
                interface.assembly.magnesium = responseObj.good.filter(n => n.title === "Magnesium")[0].amount;
                interface.assembly.b3 = responseObj.good.filter(n => n.title === "Vitamin B3")[0].amount;
                interface.assembly.potassium = responseObj.good.filter(n => n.title === "Potassium")[0].amount;
                interface.assembly.b2 = responseObj.good.filter(n => n.title === "Vitamin B2")[0].amount;
                interface.assembly.zinc = responseObj.good.filter(n => n.title === "Zinc")[0].amount;
                interface.assembly.copper = responseObj.good.filter(n => n.title === "Copper")[0].amount;
                interface.assembly.b5 = responseObj.good.filter(n => n.title === "Vitamin B5")[0].amount;

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
            });
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
                if (sqlModel.recipeID === id)
                {
                    interface.assembly = [...sqlModel];
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
                    console.log(`Nutrition with: ${id} doesnt exist in db.`);
                    cb(0);
                }
            });
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