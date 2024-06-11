import dbConfig from '../config/dbConfig.js';
import { Sequelize } from 'sequelize';
import initModels from './init-models.js';

const sequelize = new Sequelize(
    "postgres://postgres.hnfpaekjsbeaqtuywzpj:huannguyen2114@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
);

const models = initModels(sequelize);

export {
    models,
    sequelize
};
