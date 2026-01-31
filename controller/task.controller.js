const Task = require("../model/Task");
const taskController = {};
// 할일 생성
taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({ task, isCompleted });
    await newTask.save();
    res
      .status(200)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Task creation failed", error: error.message });
  }
};

// 할일 조회
taskController.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).select("-__v");
    res.status(200).json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Task retrieval failed", error: error.message });
  }
};

// 선택된 할일을 수정 (끝남 안끝남만 수정)
taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "Invalid isCompleted value" });
    }
    const updateData = { isCompleted };
    // findByIdAndUpdate : 선택된 할일을 수정
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-__v");
    // 수정된 할일을 반환 성공시
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Task update failed", error: error.message });
  }
};

taskController.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Task deletion failed", error: error.message });
  }
};
module.exports = taskController;
