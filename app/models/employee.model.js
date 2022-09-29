module.exports = (sequelize, Sequalize) => {
	const Employee = sequelize.define("Employee", {
		first_name: {
			type: Sequalize.STRING
		},
		last_name: {
			type: Sequalize.STRING
		},
		phone: {
			type: Sequalize.STRING
		}
	});

	return Employee;
};