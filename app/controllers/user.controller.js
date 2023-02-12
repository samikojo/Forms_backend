const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	const user = {
		firstName: req.body.first_name,
		lastName: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		accountType: req.body.accountType, // For testing only!
		// accountType: 1, // User level, Admin level can't be created using web app
	};

	// Save in the database
	User.create(user).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the User."
		});
	});
};

exports.update = (req, res) => {
	const id = req.params.id;

	User.update(req.body, {
		where: { id: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "User was updated successfully."
			});
		} else {
			res.send({
				message: `Cannot update User with id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error updating User with id=" + id
		});
	});
};

exports.findOne = (req, res) => {
	const email = req.params.email;

	User.findOne({
		where: {
			email: email
		}
	}).then(data => {
		if (data) {
			res.send(data);
		} else {
			res.status(404).send({
				message: `Cannot find Employee with id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error retrieving Employee with id=" + id
		});
	});
};

exports.authenticate = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		where: {
			email: email
		}
	}).then(data => {
		if (data.isValidPassword(password)) {
			res.status(200).send({
				message: "Email and password match!"
			});
		}
		else {
			res.status(401).send({
				message: "Invalid username and/or password!"
			});
		}
	}).catch(err => {
		// Email is not found from the database or something went wrong
		res.status(401).send({
			message: "Invalid username and/or password!"
		});
	});
};