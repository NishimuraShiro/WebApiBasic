const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const dbPath = '/Users/hamiltonshiro/Desktop/WebApiBasic/app/SQL/database.sqlite3';

//Get all users
app.get('api/v1/users', (req,res) => {
    const db = new sqlite3.Database(dbPath);    //データベースに接続

    db.all('SELECT * FROM users', (err, rows) => {
        res.json(rows)
    })
    db.close()  //データベース接続終了
})
const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listen on port:"+port)