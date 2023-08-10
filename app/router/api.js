const express = require("express");
const path = require("path");
const router = express.Router();
const connection = require("../db");

// ルーターを利用した静的ファイル・フォルダを提供するミドルウェアの設定
router.use(express.static(path.join(__dirname, "../views")));

router.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/new.html"));
});

//全ユーザー取得機能の実装
//@path api/users[GET]
router.get("/users", (req, res) => {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.render("index", { data: result }); //"index"はejsのファイル名
  });
});

//ユーザーの部分一致、検索機能の実装
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

// 新規投稿機能の実装
router.post("/create", (req, res) => {
  const { name, profile } = req.body;
  const post = { name, profile };

  connection.query("INSERT INTO users SET ?", post, (err, result) => {
    if (err) throw err;
    console.log("Data inserted successfully!");
    res.redirect("/api/users"); // Redirect after the data is inserted
  });
});

// 編集フォームを表示するためのエンドポイント処理の実装
router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [userId], (err, result) => {
    if (err) throw err;
    res.render("edit", { user: result });
  });
});

// 編集機能の実装
router.post("/update/:id", (req, res) => {
  const userId = req.params.id;
  const { name, profile } = req.body;
  const query = "UPDATE users SET name = ?, profile = ? WHERE id = ?";
  connection.query(query, [name, profile, userId], (err, result) => {
    if (err) throw err;
    console.log("Data updated successfully!");
    res.redirect("/api/users");
  });
});

// 削除機能の実装
router.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [userId], (err, result) => {
    if (err) throw err;
    console.log("Data deleted successfully!");
    res.redirect("/api/users");
  });
});

module.exports = router;
