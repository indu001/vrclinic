require('dotenv').config();
const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.DEV_PORT, 10),
    host:process.env.DEV_HOST
  },
  database: {
    host: process.env.DEV_DB_HOST,
    user:process.env.DEV_DB_USER,
    password:process.env.DEV_DB_PASSWORD,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME,
  }
};

const production = {
  app: {
    port: parseInt(process.env.SERV_PORT)
  },
  database: {
    host: process.env.HOST,
    port:process.env.DB_PORT,
    name: process.env.DB_NAME,
  }
};

const config = {
  development,
  production
}
module.exports= config[env];