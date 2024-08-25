var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
let db;
const url =
  "mongodb+srv://admin:Kimyubin!12@yubinkim.vdjthal.mongodb.net/?retryWrites=true&w=majority&appName=yubinKim";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
  })
  .catch((err) => {
    console.log(err);
  });
router.post("/login", function (req, res) {
  let apiResult = {
    code: 400, //요청상태코드: 200:정상처리 400:요청리소스가 없을때 500:서버개발자코딩에러
    data: null, //백엔드에서 프론트엔드로 전달한 데이터
    msg: "", //처리결과 코멘트(백엔드개발자가 프론트엔드 개발자에게 알려주는 코멘트메시지)
  };
  try {
    const { email, password } = req.body;
    //일단 백엔드로 잘 넘어오는지 체크하기 위해 출력 좀 해볼까?
    console.log(`email: ${email}, pwd: ${password}`);
    if (email == db.collection("user").findOne({ email: email })) {
      if (password == db.collection("user").findOne({ password: password })) {
      } else {
        req.setEncoding("비밀번호가 틀림");
      }
    } else {
      req.setEncoding("꺼지셈");
    }
  } catch (err) {}
});
module.exports = router;
