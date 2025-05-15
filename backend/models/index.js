// models/index.js
const sequelize = require('../config/db.config');
const User = require('./user.model');
const Pet = require('./pet.model');

// Thiết lập quan hệ: Một user có nhiều pet
User.hasMany(Pet, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Pet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Pet };
