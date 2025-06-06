import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { setUpModels } from "../database/models/index.js"

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || "kanban_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "admin123",
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

setUpModels(sequelize)
sequelize.sync()

export default sequelize