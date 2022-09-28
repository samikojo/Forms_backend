module.exports = {
	HOST: "localhost",
	USER: "forms_backend",
	PASSWORD: "FormsPassword",
	DB: "forms",
	dialect: "mariadb",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};