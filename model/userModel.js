const { DataTypes, Sequelize } = require("sequelize");
const db = require("./../connection");

const dataType = Sequelize;

const User = db.define(
  "registrations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
(async () => {
  await db.sync();
})();
