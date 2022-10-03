const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
	origin: "localhost:8081",
};

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./app/models');
db.sequelize.sync().then(() => {
	console.log("Database synced.");
}).catch((error) => {
	console.log(error);
});

// Uncomment this if you need to clear the database.
// FOR DEVELOPMENT ONLY!
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });

// Testing route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Forms application." });
});

require("./app/routes/employee.routes")(app);
require("./app/routes/material.routes")(app);
require("./app/routes/work.routes")(app);
require("./app/routes/usage.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`The app is running on port ${PORT}`);
})