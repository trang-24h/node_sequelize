const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize')
const Album = sequelize.define('album',{
    albumId : {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    artistId : {
        type : Sequelize.INTEGER,
    }
    ,
    title :  Sequelize.STRING
},{
    timestamps : false
});

module.exports = Album;