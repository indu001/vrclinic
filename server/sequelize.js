const config = require('./serverConfig');
const Sequelize = require('sequelize');
const UserModel = require('./models/user');


const sequelize = new Sequelize (config.database.name, 
  config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max1: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

sequelize.authenticate()
  .then(() => {
    console.log('Connection established successfully')
  })
  .catch(err => {
    console.error('DB connection failed', err);
  });

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log('database and tables created successfully');
  });


module.exports = { sequelize, User };
