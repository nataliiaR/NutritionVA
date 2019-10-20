const Recipe = require("../Recipe");
const Ingredient = require("../interfaces/IIngredient");
const sql = require("../../ORM/recipeSql");
const Spoonacular = require("../../api/spoonacular");

let interface = {
    assembly: {
        spoonacularID: null,
        isVegan: null,
        isVegetarian: null,
        isGlutenFree: null,
        isDairyFree: null,
        isKetogenic: null,
        isFODMAP: null,
        isWHOLE30: null,
        servings: null,
        cookMinutes: null,
        sourceURL: null,
        spoonacularURL: null,
        healthScore: null,
        ingredients: [],
        instructions: null,
        name: null,
        servings: null,
        imageURL: null,
        pricePerServing: null
    },
    Create:(id, cb) => {
       if (parseInt(id))
       {
            console.log(`Api call to get recipe id: ${id}`);
            Spoonacular.getRecipe(id, (responseObj) => {
            
                interface.assembly.spoonacularID = id;
                interface.assembly.isVegan = responseObj.vegan;
                interface.assembly.isVegetarian = responseObj.vegetarian;
                interface.assembly.isGlutenFree = responseObj.glutenFree;
                interface.assembly.isDairyFree = responseObj.dairyFree;
                interface.assembly.isKetogenic = responseObj.ketogenic;
                interface.assembly.isFODMAP = responseObj.lowFodmap;
                interface.assembly.isWHOLE30 = responseObj.whole30;
                interface.assembly.servings = responseObj.servings;
                interface.assembly.cookMinutes = responseObj.cookMinutes;
                interface.assembly.sourceURL = responseObj.sourceURL;
                interface.assembly.spoonacularURL = responseObj.spoonacularSourceURL;
                interface.assembly.healthScore = responseObj.healthScore;
                interface.assembly.instructions = responseObj.instructions;
                interface.assembly.name = responseObj.title;
                interface.assembly.servings = responseObj.servings;
                interface.assembly.imageURL = responseObj.image;
                interface.assembly.pricePerServing = responseObj.pricePerServing;

               
                responseObj.extendedIngredients.forEach(object => {
                    Ingredient.read(object.id, (result) => {
                        if(result === 0)
                        {
                            console.log(`Ingredient source object is: ${JSON.stringify(object)}`)
                            //ingredient doesnt exist in our database so add it
                            Ingredient.create(object, (returnedObj) => {
                                if(returnedObj !== 0)
                                {
                                    console.log(`Ingredient object stored is: ${JSON.stringify(returnedObj)}`)
                                    console.log(`Added Ingredient ${returnedObj.spoonacularID} to DB`);
                                    interface.assembly.ingredients.push(returnedObj.spoonacularID);
                                }
                                else
                                {
                                    console.log(`Failed to add Ingredient ${object.id} to DB`);
                                    interface.assembly.ingredients.push(object.id);
                                }
                            })
                        }
                        else
                        {
                            console.log(`Ingredient ${object.id} already in DB`);
                            interface.assembly.ingredients.push(object.id);
                        }
                    })
                });

                try
                {
                    interface.assemble(interface.assembly,(obj) => {
                        sql.Create(obj, (sqlObj) =>{
                            cb(sqlObj);
                        })
                    });
                }
                catch(err)
                {
                    console.error(`Failed to Build Recipe: ${id} database may be corrupted or API cannot find recipe.`);
                    console.log(err)
                    cb(0);
                }
                

            })
       }
       else
       {
          console.log(`Ingredient Factory Recieved invalid id; ${id}`);
          cb(0);
       }
    },
    Retrieve:(id, cb) => {
        console.log(`Searching DB for ${id}`);
        if (typeof parseInt(id) === 'number')
        {
            sql.Read(parseInt(id), (sqlModel) => {
                console.log(JSON.stringify(sqlModel));
                if(Object.entries(sqlModel).length === 1)
                {
                    console.log("attempting to build recipe from database");
                    try
                    {
                        console.log(JSON.stringify(sqlModel));
                        interface.assembly.spoonacularID = sqlModel.spoonacularID;
                        interface.assembly.isVegan = sqlModel.isVegan;
                        interface.assembly.isVegetarian = sqlModel.isVegetarian;
                        interface.assembly.isGlutenFree = sqlModel.isGlutenFree;
                        interface.assembly.isDairyFree = sqlModel.isDairyFree;
                        interface.assembly.isKetogenic = sqlModel.isKetogenic;
                        interface.assembly.isFODMAP = sqlModel.isFODMAP;
                        interface.assembly.isWHOLE30 = sqlModel.isWHOLE30;
                        interface.assembly.servings = sqlModel.servings;
                        interface.assembly.cookMinutes = sqlModel.cookMinutes;
                        interface.assembly.sourceURL = sqlModel.sourceURL;
                        interface.assembly.spoonacularURL = sqlModel.spoonacularURL;
                        interface.assembly.healthScore = sqlModel.healthScore;
                        interface.assembly.ingredients = sqlModel.ingredients;
                        interface.assembly.instructions = sqlModel.instructions;
                        interface.assembly.name = sqlModel.name;
                        interface.assembly.servings = sqlModel.servings;
                        interface.assembly.imageURL = sqlModel.imageURL;
                        interface.assembly.pricePerServing = sqlModel.pricePerServing;
                        console.log(JSON.stringify(interface.assembly));
                        cb(sqlModel);
                            
                    }
                    catch(err)
                    {
                        console.error(`Failed to Build Recipe: ${id} database may be corrupted or API cannot find recipe.`);
                        console.log(err);
                        cb(0);
                    }
                }
                else
                {
                    console.error(`Recipe Doesnt Exist in DB: ${id}`);
                    cb(0);
                }
            });
        }
        else
        {
           console.log(`Create User Profile Get Request Body Does not Contain User Object`);
           cb(0);
        }
    },
    assemble:(assembly, cb) => {
        console.log(JSON.stringify(assembly))
        let concreteObj = new Recipe(assembly);
        console.log('\x1b[36m%s\x1b[0m',"Assembled Recipe")
        console.log(JSON.stringify(concreteObj))
        cb(concreteObj);
    }
}

module.exports = interface;