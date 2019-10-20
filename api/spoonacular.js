const config = require("../config/config");
const axios = require("axios");
const apiConfig = {
    headers: {
        'X-RapidAPI-Host': config.spoonacular.host,
        'X-RapidAPI-Key': config.spoonacular.key
    }
};
  
let Interface = {
    getRecipe:(recipeID, cb) => {
        axios.get(`${config.spoonacular.url}/recipes/${recipeID}/information`, apiConfig)
        .then((data) => {
            if(data.status === 200)
            {
                cb(data.data);
            }
            else
            {
                console.error(data);
                cb(0);
            }
        })
        .catch((err) => {
            console.error(err);
            cb(err);
        });
    },
    getNutrients:(recipeID, cb) => {
        axios.get(`${config.spoonacular.url}/recipes/${recipeID}/nutritionWidget.json`, apiConfig)
        .then((data) => {
            if(data.status === 200)
            {
                cb(data.data);
            }
            else
            {
                console.error(data);
                cb(0);
            }
        })
        .catch((err) => {
            console.error(err);
            cb(err);
        });
    },
    getMealPlan:(obj, cb) => {
        let params = {
            timeFrame: obj.timeFrame,
            targetCalories: obj.targetCalories,
            diet: obj.dietStr,
            exclude: obj.exclusionList
        }
        axios.get(`${config.spoonacular.url}/recipes/mealplans/generate`, { params: params, headers: apiConfig.headers})
        .then((data) => {
            if(data.status === 200)
            {
                cb(data.data);
            }
            else
            {
                console.error(data);
                cb(0);
            }
         })
        .catch((err) => {
            console.error(err);
            cb(err);
        });
    },  
}

module.exports = Interface;