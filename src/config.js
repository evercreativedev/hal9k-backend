require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  HOST: process.env.RDS_HOSTNAME,
  DBPORT: process.env.RDS_PORT,
  DATABASE: process.env.RDS_DATABASE,
  PASSWORD: process.env.RDS_PASSWORD,
  USER: process.env.RDS_USERNAME,
  PORT: process.env.PORT,
};
