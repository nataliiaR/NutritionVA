const IRecipe = require("../db/classes/interfaces/IRecipe");
const INutrients = require("../db/classes/interfaces/INutrients");
const IIngredients = require("../db/classes/interfaces/IIngredient");

// =============================================================
module.exports = (app) => {
  app.get("/api/Recipe/:id", (req, res) => {
    IRecipe.read(parseInt(req.params.id), result => {
      console.log('Sending Response: ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get("/api/Nutrients/:id", (req, res) => {
    INutrients.read(parseInt(req.params.id), result => {
      res.json(result);
    });
  });

  app.get("/api/Ingredient/:id", (req, res) => {
    IIngredients.read(parseInt(req.params.id), result => {
      res.json(result);
    });
  });
}