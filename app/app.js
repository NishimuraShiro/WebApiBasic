const express = require("express");
const app = express();
const mysql = require("mysql2");
const userRouter = require("./router/user");
const path = require("path");

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

app.get("/", (req, res) => {
  //res.status(500).json({ msg: "エラーです！" });
  //res.send("あいうえお");
  res.render("index", { text: "Node jsとexpress" });
});

//Get all users
app.get("/api/users", (req, res) => {
  connection.query(`select * from users`, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

//Get a user
app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  connection.query(`select * from users where id=${id}`, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//Search users matching keyword
app.get("/api/search", (req, res) => {
  const keyword = req.query.q;
  connection.query(
    `select * from users where name like '${keyword}'`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
});

app.listen(3000);
