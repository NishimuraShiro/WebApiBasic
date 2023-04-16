const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const dbPath = "users.db";

//Get all users
app.get("/api/users", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("select * from users", (err, rows) => {
    res.json(rows);
  });
  db.close();
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(port + "server opened!");
