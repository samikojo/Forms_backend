module.exports = app => {
	const users = require("../controllers/user.controller.js");

	var router = require("express").Router();

	router.post("/", users.create);

	router.post("/auth", users.authenticate)

	router.get("/:email/", users.findOne);

	router.put("/:id", users.update);

	app.use('/api/users', router);
};