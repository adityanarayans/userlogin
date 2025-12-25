const { Sequelize } = require("sequelize");

// Use SQLite for local development (force if MySQL fails)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.db",
  logging: false
});

module.exports = sequelize;
