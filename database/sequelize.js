const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql_advance','root','example',{
    dialect : 'mysql'
});

module.exports = sequelize;