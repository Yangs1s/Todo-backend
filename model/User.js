// 유저 정보
// 이메일,패스워드,유저이름
// 패스워드는 암호화되어 저장
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

UserSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "1d" });

  return token;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
