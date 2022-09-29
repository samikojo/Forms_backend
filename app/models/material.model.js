module.exports = (sequelize, Sequalize) => {
	const Material = sequelize.define("Material", {
		rawMaterial: {
			type: Sequalize.STRING
		},
		amount: {
			type: Sequalize.DECIMAL(10, 3)
		}
	});

	return Material;
};