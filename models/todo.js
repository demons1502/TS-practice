const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    trim: true,
    required: [true, 'A task must have a name'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
