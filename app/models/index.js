const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
		}
	}
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.materials = require('./material.model.js')(sequelize, Sequelize);
db.employees = require('./employee.model.js')(sequelize, Sequelize);
db.work = require('./work.model.js')(sequelize, Sequelize);
db.usage = require('./usage.model.js')(sequelize, Sequelize);


// Associations (foreign key references)
db.usage.HasOne(db.employees, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });
db.usage.HasOne(db.materials, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });
db.usage.HasOne(db.work, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });

module.exports = db;