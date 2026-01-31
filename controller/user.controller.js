const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const userController = {};

// 회원가입
userController.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 이메일 기준으로 유저를 조회

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "유저가 이미 존재합니다." });
    }
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    throw new Error(error);
  }
};

// 로그인
userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ message: "로그인 성공", user, token });
      } else {
        throw new Error("이메일 또는 패스워드가 일치하지 않습니다.");
      }
    } else {
      return res
        .status(400)
        .json({ message: "이메일 또는 패스워드가 일치하지 않습니다." });
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = userController;
