import { TodoRequest, ITodo } from './../types/todo';
import View from '../views/todoView';
import Model from '../models/todoModel';

class Controller {
  view: View;
  model: Model;

  constructor(model: Model, view: View) {
    this.view = view;
    this.model = model;

    this.model.bindTodoListChange(this.handleTodoListChange);
    this.view.addTodo(this.handleAddTodo);
    this.view.deleteTodoApi(this.handleDeleteTodo);
    this.view.updateTodo(this.handleUpdateTodo);
    this.view.toggleTodo(this.handleUpdateTodo);
  }

  async handleRenderTodo() {
    await this.model.getTodos();
    this.view.render(this.model.todos);
  }

  handleAddTodo = (todo: TodoRequest) => {
    this.model.addTodo(todo);
  };

  handleDeleteTodo = (id: string) => {
    this.model.deleteTodo(id);
  };

  handleUpdateTodo = (id: string, todo: TodoRequest) => {
    this.model.updateTodo(id, todo);
  };

  handleTodoListChange = (todos: ITodo[]) => {
    this.view.render(todos);
  };
}

const app = new Controller(new Model(), new View());
app.handleRenderTodo();
console.log(app);

export default Controller;
