const dotenv = require("./dotenv");

module.exports = {
  development: {
    username: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_DATABASE,
    host: dotenv.DB_HOST,
    port: dotenv.DB_PORT,
    dialect: dotenv.DB_DIALECT,
  },
};