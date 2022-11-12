export interface ITodo {
  _id: string;
  task: string;
  isCompleted?: boolean;
}

export type TodoRequest = Partial<Omit<ITodo, '_id'>>;
