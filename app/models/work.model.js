module.exports = (sequelize, Sequalize) => {
	const Work = sequelize.define("Work", {
		code: {
			type: Sequalize.STRING
		},
		due_date: {
			type: Sequalize.DATE
		},
		start_date: {
			type: Sequalize.DATE
		}
	});

	return Work;
};