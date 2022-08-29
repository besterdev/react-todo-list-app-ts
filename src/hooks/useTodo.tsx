import { useMutation, useQuery } from "@tanstack/react-query";
import { appAxios } from "../libs/axios";
import { Todo, TodoList } from "../pages/main/models";

const api = "https://candidate.neversitup.com/todo/todos";
const fetchTodoList = async (): Promise<TodoList> => {
  const response = await appAxios().get(`${api}`);
  return response.data;
};

export const fetchTodo = async (totoId: string | undefined) => {
  if (totoId) {
    const response = await appAxios().get(`${api}/${totoId}`);
    return response.data;
  }
};

const createTodo = async (todo: any): Promise<Todo> => {
  const response = await appAxios().post(`${api}`, todo);
  return response.data;
};

const updateTodo = async (totoId: string, todo: any): Promise<Todo> => {
  const response = await appAxios().put(`${api}/${totoId}`, todo);
  return response.data;
};

const deleteTodo = async (totoId: string): Promise<Todo> => {
  const response = await appAxios().delete(`${api}/${totoId}`);
  return response.data;
};

export const useTodoListQuery = () => useQuery(["TodoList"], fetchTodoList);

export const useTodoQuery = (totoId: string) =>
  useQuery(["Todo", totoId], () => fetchTodo(totoId));

export const useCreateTodo = () => {
  return useMutation(({ todo }: any) => createTodo(todo), {
    onSuccess: (todo) => {
      console.log(`created task ${todo}`);
    },
  });
};

export const useUpdateTodo = () => {
  return useMutation(({ todoId, todo }: any) => updateTodo(todoId, todo), {
    onSuccess: (todo) => {
      console.log(`updated task ${todo.title}`);
    },
  });
};

export const useDeleteTodo = () => {
  return useMutation(({ todoId }: any) => deleteTodo(todoId), {
    onSuccess: (todo) => {
      console.log(`deleted task ${todo.title}`);
    },
  });
};
