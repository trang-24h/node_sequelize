const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

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
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    price: Sequelize.INTEGER
  },
  {
    hooks: {
      beforeValidate: () => {
        console.log("beforeValidate");
      },
      afterValidate: res => {
        console.log("afterValidate");
        res.name = bcrypt.hashSync(res.name, 8);
      },
      beforeCreate: () => {
        console.log("beforeCreate");
      },
      afterCreate: res => {
        console.log("afterCreate: Create article with slug ", res.dataValues);
      }
    }
  }
);

connection
  .sync({
    force: true
  })
  .then(() => {
     Product.create({
      slug: "abc-slug",
      name: "abc",
      color: "red",
      price: 222
    });
  })
  .catch(error => {
    console.log(error);
  });
