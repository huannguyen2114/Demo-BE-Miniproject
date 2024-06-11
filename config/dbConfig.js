import 'dotenv/config';

const dbConfig = {
    HOST: process.env.HOST,
    USER: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DBNAME,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;