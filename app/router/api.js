const express = require("express");
const path = require("path");
const router = express.Router();
const connection = require("../db");

//静的ファイルのルートディレクトリを設定
//app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "views")));
//app.use(express.static("views"));

//テンプレートエンジン(動的ファイル)
// router.set("view engine", "ejs");
// router.set("views", path.join(__dirname, "../views"));

//middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
// router.get("/search", (req, res) => {
//   const keyword = req.query.q;
//   connection.query(
//     `select * from users where name like '%${keyword}%'`,
//     (err, result) => {
//       if (err) throw err;
//       console.log(result);
//       res.json(result);
//     }
//   );
// });

//idによるユーザー取得
// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   connection.query(`select * from users where id=${id}`, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });

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
