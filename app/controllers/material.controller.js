const db = require("../models");
const Material = db.materials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.rawMaterial) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	const material = {
		rawMaterial: req.body.rawMaterial,
		amount: req.body.amount ?? 0,
	};

	Material.create(material)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Material."
			});
		});
};

exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { rawMaterial: { [Op.like]: `%${name}%` } } : null;

	Material.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving materials."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Material.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Material with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Material with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Material.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Material was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Material with id=${id}. Maybe Material was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Material with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Material.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Material was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Material with id=${id}. Maybe Material was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Material with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Material.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Materials were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all materials."
			});
		});
};
