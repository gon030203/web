// models/pet.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Pet = sequelize.define('Pet', {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  species: { 
    type: DataTypes.STRING,
    comment: 'Loài thú cưng (ví dụ: chó, mèo)' 
  },
  breed: { 
    type: DataTypes.STRING,
    comment: 'Giống thú cưng' 
  },
  age: { 
    type: DataTypes.INTEGER,
    comment: 'Tuổi của thú cưng'
  },
}, {
  tableName: 'pets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Pet;
