require("dotenv").config();
const { Sequelize } = require("sequelize");

const customLogger = (query, options) => {
  console.log(`Executing query: ${query}`);
  if (options.bind)
    console.log(`Query values: ${JSON.stringify(options.bind)}`);
};

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
    logging: customLogger,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
    logging: customLogger,
  },
};

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

module.exports = { sequelize, config };
