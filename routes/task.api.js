const express = require("express");
const taskController = require("../controller/task.controller");

const router = express.Router();

// 할일 조회
router.get("/", taskController.getTasks);
// 할일 추가
router.post("/", taskController.createTask);
// 선택된 할일을 수정
router.put("/:id", taskController.updateTask);
// 선택된 할일을 삭제
router.delete("/:id", taskController.deleteTask);

module.exports = router;
