module.exports = app => {
	const materials = require("../controllers/material.controller.js");

	var router = require("express").Router();

	router.post("/", materials.create);

	router.get("/", materials.findAll);

	// Retrieve a single Tutorial with id
	router.get("/:id", materials.findOne);

	// Update a Tutorial with id
	router.put("/:id", materials.update);

	// Delete a Tutorial with id
	router.delete("/:id", materials.delete);

	// Delete all Tutorials
	router.delete("/", materials.deleteAll);

	app.use('/api/materials', router);
};