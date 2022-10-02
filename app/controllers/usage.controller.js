const db = require("../models");
const Usage = db.Usage;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Tutorial
	const usage = {
		amount: req.body.amount,
		time: req.body.time,
		EmployeeID: req.body.employee,
		MaterialID: req.body.material,
		WorkID: req.body.work
	};

	// Save in the database
	Usage.create(usage)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Usage."
			});
		});
};

exports.findAll = (req, res) => {
	Material.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Usages."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Usage.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Usage with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Usage with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Usage.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Usage was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Usage with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Usage with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Usage.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Usage was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Usage with id=${id}. Maybe Usage was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Usage with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Usage.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Usages were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Usages."
			});
		});
};
