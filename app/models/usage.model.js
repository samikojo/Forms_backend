module.exports = (sequelize, Sequalize) => {
	const Usage = sequelize.define("Usage", {
		amount: {
			type: Sequalize.DECIMAL
		},
		time: {
			type: Sequalize.DATE,
			defaultValue: Sequalize.NOW
		},

	});

	return Usage;
};