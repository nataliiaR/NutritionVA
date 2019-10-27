
const express = require('express');
const db = require("./db/models")
const logger = require("morgan");

let app = express();
let PORT = process.env.PORT || 3000;


// HTTP Communication Nodes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Enables React
if (process.env.NODE_ENV === "production") {app.use(express.static("client/build"));}

// Routes
require("./routes/auth.js")(app);
require("./routes/data.js")(app);
require("./routes/user.js")(app);

// All other routes redirected to react
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Listener
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })
});