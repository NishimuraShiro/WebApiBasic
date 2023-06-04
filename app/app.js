const express = require("express");
const app = express();
const mysql = require("mysql2");
// const sqlite3 = require("sqlite3");
// const dbPath = "users.db";

//app.use(express.static("public"));

//mysqlの接続に必要な情報
const connection = mysql.createConnection({
  host: "db",
  user: "shiro",
  password: "shiro",
  database: "api_basic"
});

//mysql接続
// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected");
// });

//Get all users
app.get("/api/users", (req, res) => {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
  // res.json({ id: 1, name: "Yui" });

  // const db = new sqlite3.Database(dbPath);
  // db.all("select * from users", (err, rows) => {
});
// db.close();
// });

const port = 3000;
app.listen(port);
console.log(port + "server opened!");
