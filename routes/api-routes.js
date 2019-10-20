const IUserProfile = require("../classes/interfaces/IUserProfile");

const IRecipe = require("../classes/interfaces/IRecipe");
const INutrients = require("../classes/Nutrients");
const IIngredients = require("../classes/Ingredient");


// Routes
// =============================================================
module.exports = (app) => {


  app.get("/api/UserProfile/:id", (req, res) => {
    IUserProfile.read(parseInt(req.params.id), result => {
      res.json(result);
    });
  });

  app.post("/api/UserProfile", (req, res) => {
    IUserProfile.create(req.body, (result) => {
      console.log('Sending Response: ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.put("/api/UserProfile/:id", (req, res) => {
    IUserProfile.update(req.params.id, req.body, result => {
      res.json(result);
    } );
  });

  app.delete("/api/UserProfile/:id", (req, res) => {
    IUserProfile.delete(req.params.id, result => {
      res.json(result);
    } );
  });

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

};
