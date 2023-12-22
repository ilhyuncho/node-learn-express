const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

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

app.get("/", (req, res) => {
  console.log("get요청만 실행");
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/test", (req, res) => {
  console.log("get test 요청만 실행");
  res.sendFile(path.join(__dirname, "/index.html"));
});

// 에러 처리
app.use((err, req, res, next) => {
  console.log("get요청 미들웨어");
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 대기중");
});
