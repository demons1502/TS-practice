import { TodoRequest, ITodo } from './../types/todo';
import View from '../views/todoView';
import Model from '../models/todoModel';

class Controller {
  view: View;
  model: Model;

  constructor(model: Model, view: View) {
    this.view = view;
    this.model = model;

    this.view.addTodo(this.handleAddTodo);
    this.model.bindTodoListChange(this.handleTodoListChange);
  }

  async handleRenderTodo() {
    await this.model.getTodos();
    this.view.render(this.model.todos);
  }

  handleAddTodo = (todo: TodoRequest) => {
    this.model.addTodo(todo);
  };

  handleTodoListChange = (todos: ITodo[]) => {
    this.view.render(todos);
  };
}

const app = new Controller(new Model(), new View());
app.handleRenderTodo();
console.log(app);

export default Controller;
