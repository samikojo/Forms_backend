module.exports = app => {
	const jobs = require("../controllers/work.controller.js");

	var router = require("express").Router();

	router.post("/", jobs.create);

	router.get("/", jobs.findAll);

	// Retrieve a single Tutorial with id
	router.get("/:id", jobs.findOne);

	// Update a Tutorial with id
	router.put("/:id", jobs.update);

	// Delete a Tutorial with id
	router.delete("/:id", jobs.delete);

	// Delete all Tutorials
	router.delete("/", jobs.deleteAll);

	app.use('/api/jobs', router);
};