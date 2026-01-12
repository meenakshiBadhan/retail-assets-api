require("dotenv").config();
const { Sequelize } = require("sequelize");

// Custom logger to log SQL queries and their values
const customLogger = (query, options) => {
  console.log(`Executing query: ${query}`);
  if (options.bind)
    console.log(`Query values: ${JSON.stringify(options.bind)}`);
};

// Common configuration for all environments
const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  migrationStorageTableName: "_sequelize_meta",
  seederStorage: "sequelize",
  seederStorageTableName: "_sequelize_data",
};

// Environment-specific configurations
const config = {
  development: {
    ...commonConfig,
    logging: customLogger,
  },
  test: {
    ...commonConfig,
    logging: false,
  },
  production: {
    ...commonConfig,
    logging: customLogger,
  },
};

// Initialize Sequelize instance
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

module.exports = { sequelize, config };

// Add default export for Sequelize CLI
module.exports.development = config.development;
module.exports.test = config.test;
module.exports.production = config.production;
