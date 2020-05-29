const Sequelize = require("sequelize");

const connection = new Sequelize("sql_advance", "root", "example", {
  dialect: "mysql"
});

const Product = connection.define(
  "exam",
  {
    slug: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    //   defaultValue: "normal",
      unique: true,
      allowNull: false,
      validate :{
        len: {
            args : [2,10],
            msg : 'wrong length'
        },
        startsWithUpper : (nameVal)=>{
            console.log(nameVal)
            const first = nameVal.charAt(0);
            console.log('first',first)
            const startsWithUpper = first===first.toUpperCase();
            if(!startsWithUpper){
                throw new Error('Begin with upper letter')
            }
        }
      }
    },
    color: Sequelize.STRING,
    price: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

connection
  .sync({
    force: true
  })
  .then(() => {
       
      Product.create({
          slug : 'wibble',
          name : 'demo',
          color : 'red',
          price : 2
      })
  })
  .catch(error => {
    console.log(error);
  });
