import dbConfig from "../config/dbConfig.js";
import { Sequelize } from "sequelize";
import initModels from "./init-models.js";

const sequelize = new Sequelize(
    "postgresql://postgres:XREvlSeAXKBuIBNtFaALWgwfWBaGaBwx@roundhouse.proxy.rlwy.net:41989/railway",
)

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const models = initModels(sequelize)

export {
    models
}
