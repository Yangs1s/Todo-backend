const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// 회원가입 엔드포인트

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
