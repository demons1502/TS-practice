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
      todos.forEach((todo) => {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');
        taskEl.id = todo._id;
        taskEl.setAttribute('isCompleted', `${todo.isCompleted}`);

        todo.isCompleted && taskEl.classList.add('active');

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

  deleteTodoApi(handler: (id: string) => void) {
    this.listTodo.addEventListener('click', (e: MouseEvent) => {
      const target = e?.target as HTMLElement;
      const idTarget = target.parentNode?.parentElement?.id;
      if (
        target.className === 'delete' &&
        target.tagName.toLowerCase() === 'button'
      ) {
        if (idTarget) {
          handler(idTarget);
        }
      }
    });
  }

  updateTodo(handler: (id: string, data: TodoRequest) => void) {
    this.listTodo.addEventListener('click', (e: MouseEvent) => {
      const target = e?.target as HTMLElement;
      const inputTarget = target?.parentNode?.previousSibling
        ?.firstChild as HTMLInputElement;
      const idTarget = target.parentNode?.parentElement?.id;

      if (
        target.className === 'edit' &&
        target.tagName.toLowerCase() === 'button'
      ) {
        if (target.innerText.toLowerCase() === 'edit') {
          target.innerText = 'Save';
          inputTarget.removeAttribute('readonly');
          inputTarget.focus();
        } else {
          target.innerText = 'Edit';
          inputTarget.setAttribute('readonly', 'readonly');

          idTarget && handler(idTarget, { task: inputTarget.value });
        }
      }
    });
  }

  toggleTodo(handler: (id: string, data: TodoRequest) => void) {
    this.listTodo.addEventListener('click', (e: MouseEvent) => {
      const target = e?.target as HTMLElement;
      const idTarget =
        target.parentNode?.parentElement?.id || target.attributes[1]?.value;
      let isCompleted;

      if (target.parentNode?.parentElement) {
        isCompleted =
          target.parentNode?.parentElement.attributes[2]?.value === 'true'
            ? true
            : false;
      }

      if (target.tagName.toLowerCase() !== 'button') {
        if (idTarget) {
          // console.log(idTarget);
          handler(idTarget, { isCompleted: !isCompleted });
        }
      }
    });
  }
}

export default View;
