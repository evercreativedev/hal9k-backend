const { HOST, DBPORT, DATABASE, USER, PASSWORD } = require('./src/config');

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "host": HOST,
  "port": DBPORT,
  "database": DATABASE,
  "username": USER,
  "password": PASSWORD,
}