import { ITodo, TodoRequest } from './../types/todo';
import {
  addTodoApi,
  deleteTodoApi,
  getTodoApi,
  updateTodoApi,
} from '../services/apis/todo';

class Model {
  todos: ITodo[];
  onTodoListChange: (todos: ITodo[]) => void;

  constructor() {
    this.todos = [];
    this.onTodoListChange = (todos: ITodo[]) => {
      console.log(todos);
    };
  }

  bindTodoListChange(handler: (todos: ITodo[]) => void) {
    this.onTodoListChange = handler;
  }

  handleTodoChange(todos: ITodo[]) {
    this.onTodoListChange(todos);
  }

  async getTodos() {
    try {
      const res = await getTodoApi();
      this.todos = res.data.todos;
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todo: TodoRequest) {
    try {
      const res = await addTodoApi(todo);
      await this.getTodos();
      this.handleTodoChange(this.todos);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(id: string) {
    try {
      await deleteTodoApi(id);
      this.getTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(id: string, todo: TodoRequest) {
    try {
      await updateTodoApi(id, todo);
      this.getTodos();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Model;
