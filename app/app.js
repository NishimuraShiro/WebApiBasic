const express = require("express");
const app = express();
const path = require("path");
const connection = require("./db");
// const router = express.Router();

// URL/user/...
const userRouter = require("./router/user");

// URL/api/....
const apiRouter = require("./router/api");

//静的ファイルのルートディレクトリを設定
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//テンプレートエンジン(動的ファイル)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//ルーティング
app.use("/user", userRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  connection.query("select * from users", (err, results) => {
    if (err) {
      return "エラーです。";
    } else {
      //取得したデータをejsテンプレートに渡してhtmlを生成
      res.render("index", { data: results });
    }
  });
});

app.get("/search", (req, res) => {
  const query = req.query.name;
  console.log(query);
  if (query) {
    connection.query(
      `select * from users where name like '%${query}%'`,
      (err, results) => {
        if (err) throw err;
        console.debug(results);
        res.render("search", { results, query });
      }
    );
  } else {
    res.render("search", { results: [], query: "" });
  }
});

app.listen(3000);
