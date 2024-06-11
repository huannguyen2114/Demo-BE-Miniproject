import dbConfig from '../config/dbConfig.js';
import { Sequelize } from 'sequelize';
import initModels from './init-models.js';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const models = initModels(sequelize);

export {
    models,
    sequelize
};
