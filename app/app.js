const express = require("express");
const app = express();
const path = require("path");
// const connection = require("./db");

// // URL/user/...
// const userRouter = require("./router/user");

// URL/api/....
const apiRouter = require("./router/api");

//静的ファイルのルートディレクトリを設定
//app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "views")));

//テンプレートエンジン(動的ファイル)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// //ルーティング
// app.use("/user", userRouter);
// app.use("/api", apiRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

// app.get("/", (req, res) => {
//   connection.query("select * from users", (err, results) => {
//     if (err) {
//       return "エラーです。";
//     } else {
//       //取得したデータをejsテンプレートに渡してhtmlを生成
//       res.render("index", { data: results });
//     }
//   });
// });

// app.get("/search", (req, res) => {
//   const query = req.query.name;
//   console.log(query);
//   if (query) {
//     connection.query(
//       `select * from users where name like '%${query}%'`,
//       (err, results) => {
//         if (err) throw err;
//         console.debug(results);
//         res.render("search", { results, query });
//       }
//     );
//   } else {
//     res.render("search", { results: [], query: "" });
//   }
// });

app.listen(3003);

// const express = require("express");
// const app = express();
// const connection = require("./db");

// // POSTリクエストのボディーをパースするためのミドルウェア
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // ルートエンドポイント
// app.get("/", (req, res) => {
//   res.send("Hello, this is the home page!");
// });

// // 投稿フォームのルートエンドポイント
// app.get("/form", (req, res) => {
//   res.sendFile(__dirname + "/form.html");
// });

// // データベースからデータを取得して出力
// app.get("/data", (req, res) => {
//   connection.query("SELECT * FROM users", (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // フォームデータを受け取ってデータベースに挿入
// app.post("/submit", (req, res) => {
//   const { name, profile } = req.body;
//   const post = { name, profile };

//   connection.query("INSERT INTO users SET ?", post, (err, result) => {
//     if (err) throw err;
//     res.send("Data inserted successfully!");
//   });
// });

// // サーバーを起動
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
