
require('dotenv').config();
const express = require('express');
const exphbs = require("express-handlebars");
const db = require("./models")

let app = express();
let PORT = process.env.PORT || 3000;


// HTTP Communication Nodes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);
//require("./routes/html-routes.js")(app);

// Listener
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })
});