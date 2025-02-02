const express = require("express");
const connectDb = require("./connectDb");
const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers");

const app = express();
app.use(express.json());

//Get all todos GET /api/todos
app.get("/api/todos", getAllTodos);

//Get single todo GET /api/todos/:id
app.get("/api/todos/:id", getSingleTodo);

//Create a todo POST /api/todos
app.post("/api/todos", createTodo);

//Update a todo PUT /api/todos/:id
app.put("/api/todos/:id", updateTodo);

//Delete todo DELETE /api/todos/:id
app.delete("/api/todos/:id", deleteTodo);

//Delete Todo
connectDb()
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on PORT 8080");
    });
  })
  .catch((err) => {
    console.log("error connecting to mongodb: ", err);
  });
