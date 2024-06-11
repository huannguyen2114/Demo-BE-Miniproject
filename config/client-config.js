import dbConfig from "./dbConfig.js";

export default clientConfig = {
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 5432,
};