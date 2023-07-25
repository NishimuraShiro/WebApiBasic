const express = require("express");
const router = express.Router();
const connection = require("../db");

//全ユーザー取得
//@path api/users[GET]
router.get("/users", (req, res) => {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
// app.get("/api/users", (req, res) => {
//   connection.query("select * from users", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.json(result);
//   });
// });

// router.get("/ejs_users", (req, res) => {
//   connection.query("select * from users", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.render("index", { text: "Node jsとexpress", web: result });
//   });
// });

//ユーザーの部分一致
router.get("/search", (req, res) => {
  const keyword = req.query.q;
  connection.query(
    `select * from users where name like '%${keyword}%'`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
});

//idによるユーザー取得
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(`select * from users where id=${id}`, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
