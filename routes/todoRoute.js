const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();

router.route('/').get(todoController.getAllTodo).post(todoController.addTodo);

router
  .route('/:id')
  .delete(todoController.deleteTodo)
  .patch(todoController.updateTodo);

module.exports = router;
