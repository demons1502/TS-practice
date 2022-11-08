export interface ITodo {
  id: string;
  task: string;
  isCompleted: boolean;
}

export type TodoRequest = Omit<ITodo, 'id' | 'isCompleted'>;
