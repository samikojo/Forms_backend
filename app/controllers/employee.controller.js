const db = require("../models");
const Employee = db.Employee;
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
	const employee = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	};

	// Save in the database
	Employee.create(employee)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Employee."
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
					err.message || "Some error occurred while retrieving employees."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Employee.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Employee with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Employee with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Employee.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Employee was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Employee with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Employee with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Employee.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Employee was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Employee with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Employee.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Employees were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all employees."
			});
		});
};
