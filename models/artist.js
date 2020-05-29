const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize')
const Artist = sequelize.define('artist',{
    artistId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : true,
        defaultValue : null
    },
    name :  Sequelize.STRING
},{
    timestamps : false
});

module.exports = Artist;