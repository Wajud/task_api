const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Title is required']
   },
   isCompleted: Boolean
})

const Todos = mongoose.model("Todos", TodoSchema)
module.exports = Todos