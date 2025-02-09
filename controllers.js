const Todos = require("./TodosModel");

//Get all todos
const getAllTodos = async (req, res) => {
  const todos = await Todos.find();
  res.status(200).json({ message: "Success fetching todos", data: todos });
};

//Get single todo
const getSingleTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todos.find({ _id: todoId });
    if (todo.length === 0) {
      return res.status(404).json({ message: "Todo Not Found", data: [] });
    }
    res.status(200).json({ message: "Success getting todo", data: todo });
  } catch (err) {
    console.log("An error occurred: ", err);
  }
};

//create new todo
const createTodo = async (req, res) => {
  const { title, isCompleted } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }
  try {
    const newTodo = await Todos.create({
      title,
      isCompleted: isCompleted || false,
    });
    res
      .status(201)
      .json({ message: "Todos successfully created", data: newTodo });
  } catch (err) {
    console.log("Error occured: ", err);
    return;
  }
};

//update todo
const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, isCompleted } = req.body;

  let updateData = {};
  if (title) {
    updateData.title = title;
  }

  if (isCompleted !== undefined) {
    updateData.isCompleted = isCompleted;
  }

  try {
    //  const todo = await Todos.find({ _id: todoId });

    //  const updateData = {
    //    title: title ? title : todo.title,
    //    isCompleted: isCompleted !== undefined ? isCompleted : todo.isCompleted,
    //  }
    const returnedTodo = await Todos.findByIdAndUpdate(todoId, updateData, {
      new: true,
    });

    return res
      .status(201)
      .json({ message: "Successfully updated todo", data: returnedTodo });
  } catch (err) {
    console.error("An error occurred: ", err);
  }
};

//delete todo
const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    await Todos.findByIdAndDelete(todoId);
    return res.status(200).json({ message: "Successfully deleted todo" });
  } catch (err) {
    console.error("Error deleting todo: ", err);
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
