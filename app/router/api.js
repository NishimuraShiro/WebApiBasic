const express = require("express");
const path = require("path");
const router = express.Router();
const connection = require("../db");

router.use(express.static(path.join(__dirname, "../views")));

router.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/new.html"));
});

//全ユーザー取得
//@path api/users[GET]
router.get("/users", (req, res) => {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.render("index", { data: result }); //"index"はejsのファイル名
  });
});

//ユーザーの部分一致
router.get("/search", (req, res) => {
  const keyword = req.query.q;
  if (keyword) {
    connection.query(
      `select * from users where name like '%${keyword}%'`,
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "データベースエラーが発生しました。" });
        } else {
          res.render("search", { results, keyword }); //検索結果をテンプレートに渡す
        }
      }
    );
  } else {
    res.render("search", { results: [], keyword }); //空の結果をテンプレートに渡す
  }
});

router.post("/create", (req, res) => {
  const { name, profile } = req.body;
  const post = { name, profile };

  connection.query("INSERT INTO users SET ?", post, (err, result) => {
    if (err) throw err;
    console.log("Data inserted successfully!");
    res.redirect("/api/users"); // Redirect after the data is inserted
  });
});

module.exports = router;
