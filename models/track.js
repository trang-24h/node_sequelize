const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize");
const Track = sequelize.define(
  "track",
  {
    trackId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    albumId: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = Track;
