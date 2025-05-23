//require("dotenv").config();

const config = {
  env : process.env.ENVIRONMENT || "dev",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
}

module.exports = config;