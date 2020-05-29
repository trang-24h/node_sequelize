const sequelize = require('./database/sequelize');
const Sequelize = require('sequelize')
const Test = sequelize.define('test',{
    id : {
        field : 'TestId',
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : true,
    },
    name :  {
        field : 'Name',
        type : Sequelize.STRING,
        validate : {
            notEmpty : {
                args : true,
                msg : "Name is required"
            },
            isAlpha : {
                args : true,
                msg : 'Name must only contain letters'
            },
            len : {
                args : [2,10],
                msg : 'Name between 2-10 letters'
            }
        }
    },
},{
    timestamps : false
});

module.exports = Test;