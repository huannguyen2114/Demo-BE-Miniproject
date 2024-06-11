import dbConfig from '../config/dbConfig.js';
import { Sequelize } from 'sequelize';
import initModels from './init-models.js';

const sequelize = new Sequelize(
    "postgres://postgres.hnfpaekjsbeaqtuywzpj:huannguyen2114@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const models = initModels(sequelize);

export {
    models,
    sequelize
};
