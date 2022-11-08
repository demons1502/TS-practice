const Todo = require('../models/todo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addTodo = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create(req.body);

  console.log(req.body);

  res.status(201).json({
    status: 'success',
    todo: newTodo,
  });
});

exports.getAllTodo = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();

  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    result: todos.length,
    todos,
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError('No todo found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
