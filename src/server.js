const app = require("./app");
const { HOST, DBPORT, PORT, DATABASE, USER, PASSWORD } = require("./config");

var options = {
  error: function (error, e) {
    if (e.cn) {
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message);
    }
  },
};

const pgp = require("pg-promise")(options);

const config = {
  host: HOST,
  port: DBPORT,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
};

const db = pgp(config);

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
