import { ITodo, TodoRequest } from './../types/todo';
class View {
  form: HTMLFormElement;
  input: HTMLInputElement;
  listTodo: HTMLDivElement;

  constructor() {
    this.form = document.querySelector('#new-task-form')!;
    this.input = document.querySelector('#new-task-input')!;
    this.listTodo = document.querySelector('#tasks')!;
  }

  render(todos: ITodo[]) {
    // while (this.listTodo.firstChild) {
    //   this.listTodo.removeChild(this.listTodo.firstChild);
    // }
    this.listTodo.innerHTML = '';

    if (!todos.length) {
      const p = document.createElement('p');
      p.textContent = 'Have no tasks';
      this.listTodo.appendChild(p);
    } else {
      console.log(todos);
      todos.forEach((todo) => {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');
        taskEl.id = todo.id;

        const taskContentEl = document.createElement('div');
        taskContentEl.classList.add('content');

        taskEl.appendChild(taskContentEl);

        const taskInputEl = document.createElement('input');
        taskInputEl.classList.add('text');
        taskInputEl.type = 'text';
        taskInputEl.value = todo.task;
        taskInputEl.setAttribute('readonly', 'readonly');

        taskContentEl.appendChild(taskInputEl);

        const taskActionsEl = document.createElement('div');
        taskActionsEl.classList.add('actions');

        const taskEditEl = document.createElement('button');
        taskEditEl.classList.add('edit');
        taskEditEl.innerText = 'Edit';

        const taskDeleteEl = document.createElement('button');
        taskDeleteEl.classList.add('delete');
        taskDeleteEl.innerText = 'Delete';

        taskActionsEl.appendChild(taskEditEl);
        taskActionsEl.appendChild(taskDeleteEl);

        taskEl.appendChild(taskActionsEl);

        this.listTodo.appendChild(taskEl);
      });
    }
  }

  resetInput() {
    this.input.value = '';
  }

  addTodo(handler: (todo: TodoRequest) => void) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.input.value) {
        handler({ task: this.input.value });
        this.resetInput();
      }
    });
  }
}

export default View;
