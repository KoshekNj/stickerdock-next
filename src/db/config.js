const { Sequelize } = require("sequelize");
require("dotenv").config();
import mysql2 from "mysql2";

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

module.exports = db;
