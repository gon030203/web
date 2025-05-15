const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('web', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;