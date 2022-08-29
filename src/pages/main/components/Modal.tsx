import React from "react";

import { useTodoQuery } from "../../../hooks/useTodo";
import TodoForm from "./TodoForm";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  todoId: string;
  onSubmit: (todo: any) => void;
}

const Modal: React.FC<Props> = ({ isOpen, todoId, setIsOpen, onSubmit }) => {
  const { data } = useTodoQuery(todoId);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 ${
        !isOpen ? "hidden" : null
      }`}
    >
      <div className="relative w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="authentication-modal"
            onClick={setIsOpen}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {data ? (
            <TodoForm todo={data} onSubmit={(todo) => onSubmit(todo)} />
          ) : (
            <TodoForm
              todo={{ title: "", description: "" }}
              onSubmit={(todo) => onSubmit(todo)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
