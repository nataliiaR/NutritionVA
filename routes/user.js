const IUserProfile = require("../db/classes/interfaces/IUserProfile");

// =============================================================
module.exports = (app) => {


  app.get("/api/UserProfile/:id", (req, res) => {
    IUserProfile.read(parseInt(req.params.id), result => {
      res.json(result);
    });
  });

  app.post("/api/UserProfile/p%xdD3@9)8", (req, res) => {
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
};
