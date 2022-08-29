import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import _ from "lodash";

import { FormTodo, Todo } from "./models";

import TodoCard from "./components/TodoCard";
import Modal from "./components/Modal";

import {
  useCreateTodo,
  useDeleteTodo,
  useTodoListQuery,
  useUpdateTodo,
} from "../../hooks/useTodo";
import MenuBar from "./components/MenuBar";
import { useSort2Array } from "../../utils/utils";

const Main = () => {
  const { logout }: any = useAuth();

  const { isLoading, data } = useTodoListQuery();
  const queryClient = useQueryClient();
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setISEdit] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<string>("");

  useEffect(() => {
    setTodoList(data || []);
    useSort2Array();
    return () => {
      setTodoList([]);
    };
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const items = Array.from(todoList);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setTodoList(items);
  };

  const addTodo = async (todo: FormTodo) => {
    await createMutation.mutate({
      todo: todo,
    });
    setTimeout(() => {
      queryClient.invalidateQueries(["TodoList"]);
    }, 100);
    await setIsOpen(!isOpen);
  };

  const updateTodo = async (todo: FormTodo) => {
    await updateMutation.mutate({
      todoId: todoId,
      todo: todo,
    });
    setTimeout(() => {
      queryClient.invalidateQueries(["TodoList"]);
    }, 100);
    await setIsOpen(!isOpen);
  };

  const deleteTodo = async () => {
    await deleteMutation.mutate({
      todoId: todoId,
    });
    setTimeout(() => {
      queryClient.invalidateQueries(["TodoList"]);
    }, 100);
  };

  const handlerOpenTodoModal = async (todoId: string, isEdit: boolean) => {
    setISEdit(isEdit);
    await setTodoId(todoId);
    setIsOpen(true);
  };

  const onSubmit = (todo: FormTodo) => {
    if (isEdit) return updateTodo(todo);
    return addTodo(todo);
  };

  if (isLoading) return <p>"Loading..."</p>;

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="mb-10 text-center text-3xl font-bold uppercase">
        todo list
      </h1>

      <div className="mb-10 flex h-full w-full items-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {_.map(todoList, (todo, index) => (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TodoCard
                        todo={todo}
                        provided={provided}
                        snapshot={snapshot}
                        deleteTodo={deleteTodo}
                        handlerOpenTodoModal={handlerOpenTodoModal}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Modal
        isOpen={isOpen}
        todoId={todoId}
        setIsOpen={() => setIsOpen(!isOpen)}
        onSubmit={(todo) => onSubmit(todo)}
      />

      <MenuBar
        handlerOpenTodoModal={() => handlerOpenTodoModal("", false)}
        logout={logout}
      />
    </div>
  );
};

export default Main;
