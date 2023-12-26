const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");

dotenv.config(); // .env파일을 읽어서 process.env로 만듬
// dotenv.config({ path: '.env.local' }); // 다른 파일로 만드는 법

const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const commentsRouter = require("./routes/comments");

const app = express();
app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev")); // [미들웨어: morgan]요청과 응답 정보를 콘솔에 기록
app.use("/", express.static(path.join(__dirname, "public"))); // [미들웨어: static] 정적인 파일들을 제공하는 라우터 역할 - http://localhost:3000/test.png
// [미들웨어:body-parser] express4.16.0 부터 내장됨, 요청 본문에 있는 데이터를 해석해서 req.body객체로 만들어주는 미들웨어
// req.on('data'), req.on('end') 처럼 사용할 필요가 없음
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// [미들웨어:body-parser]
app.use(cookieParser(process.env.COOKIE_SECRET)); // [미들웨어:cookie-parser] 요청에 동봉된 쿠키를 해석해 req.cookie객체를 만듬
// 해석된 쿠키는 req.cookies객체에 들어감

// [미들웨어:express-session] 세션 관리용 미들웨어, 사용자별로 req.session 객체 안에 유지
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든 요청 실행 미들웨어");
  next();
});

app.use(
  "/",
  (req, res, next) => {
    console.log("get요청 미들웨어");
    next();
  }
  //   (req, res) => {
  //     throw new Error("에러는 에러 처리 미들웨어로 감");
  //   }
);

// app.get("/", (req, res) => {
//   console.log("get요청만 실행");
//   res.sendFile(path.join(__dirname, "/index.html"));
// });

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/comments", commentsRouter);

// 일치하는 라우터가 없을떄 404 상태 코드를 응답하는 역할
app.use((req, res, next) => {
  //res.status(404).send("Not Found");
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

// 에러 처리
app.use((err, req, res, next) => {
  console.log("에러처리", err.message);
  //res.status(500).send(err.message);
  res.locals.message = err.message; // res.render 함수에 변수를 대입하는 방법도 있음
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 대기중");
});
