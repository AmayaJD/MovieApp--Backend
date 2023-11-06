const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Director = sequelize.define('director', {
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        // allowNull: false
    }
});
module.exports = Director;