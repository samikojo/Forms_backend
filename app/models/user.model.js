const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequalize) => {
	const User = sequelize.define("User", { // Model
		firstName: {
			type: Sequalize.STRING,
			field: "first_name"
		},
		lastName: {
			type: Sequalize.STRING,
			field: "last_name"
		},
		email: {
			type: Sequalize.STRING
		},
		password: {
			type: Sequalize.STRING
		},
		// AccountType
		// -1: Account disabled
		//  0: Admin
		//  1: User
		accountType: {
			type: Sequalize.INTEGER,
			field: "account_type"
		}
	}, { // Options
		hooks: {
			beforeCreate: (user) => {
				if (user.password != null) {
					const salt = bcrypt.genSaltSync(10, 'a');
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
			beforeUpdate: (user) => {
				if (user.password != null) {
					const salt = bcrypt.genSaltSync(10, 'a');
					user.password = bcrypt.hashSync(user.password, salt);
				}
			}
		}
	});

	User.prototype.isValidPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return User;
};