const db = require("../models");
const Work = db.work;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.code) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Tutorial
	const work = {
		code: req.body.code,
		start_date: req.body.start_date ?? Date.now(),
		due_date: req.body.due_date ?? Date.now()
	};

	// Save Tutorial in the database
	Work.create(work)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Tutorial."
			});
		});
};

exports.findAll = (req, res) => {
	const code = req.query.code;
	var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;

	Work.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Work.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Work with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Work with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Work.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Work was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Work with id=${id}. Maybe Work was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Work with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Work.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Work was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Work with id=${id}. Maybe Work was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Work with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Work.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Works were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Works."
			});
		});
};
