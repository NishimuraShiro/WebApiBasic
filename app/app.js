const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
// const router = express.Router();

// URL/user/...
const userRouter = require("./router/user");

// URL/api/....
const apiRouter = require("./router/api");

//静的ファイルのルートディレクトリを設定
//app.use(express.static(path.join(__dirname, "public")));

//テンプレートエンジン(動的ファイル)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//mysqlの接続に必要な情報
const connection = mysql.createConnection({
  host: "db",
  user: "shiro",
  password: "shiro",
  database: "api_basic"
});

//ルーティング
app.use("/user", userRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  //res.status(500).json({ msg: "エラーです！" });
  //res.send("あいうえお");
  res.render("index", { text: "Node jsとexpress" });
});

app.listen(3000);
