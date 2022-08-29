export interface Todo {
  _id: string;
  user_id: string;
  title?: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
}

export interface FormTodo {
  title?: string;
  description?: string;
}

export type TodoList = Todo[];
