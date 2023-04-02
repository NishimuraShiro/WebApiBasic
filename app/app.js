const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const dbPath = "app/database.sqlite3";

//Get all users
app.get('app/v1/users', (req,res) => {
    const db = new sqlite3.Database(dbPath);    //データベースに接続

    db.all('SELECT * FROM users', (err, rows) => {
        res.json(rows)
    })
    db.close()
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listen on port:"+port)