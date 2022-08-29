import dayjs from "dayjs";
import { Todo } from "../models";

interface Props {
  todo: Todo;
  provided: any;
  snapshot: any;
  deleteTodo: () => void;
  handlerOpenTodoModal: (todoId: string, isEdit: boolean) => void;
}

const TodoCard = ({
  todo,
  provided,
  snapshot,
  deleteTodo,
  handlerOpenTodoModal,
}: Props) => {
  return (
    <div
      className={`group relative mb-4 flex justify-between rounded-lg border p-4 transition duration-300 hover:scale-105 hover:border-none hover:bg-sky-500 hover:text-white xl:min-w-[500px] xl:max-w-3xl ${
        snapshot.isDragging ? "bg-slate-600" : "bg-white"
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <button
        type="button"
        className="absolute top-3 right-2.5 z-10 ml-auto  hidden items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400  group-hover:inline-flex group-hover:bg-gray-300/30 group-hover:text-white"
        data-modal-toggle="authentication-modal"
        onClick={deleteTodo}
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
      <div
        className="w-full"
        onClick={() => handlerOpenTodoModal(todo._id, true)}
      >
        <h3 className="mb-2 font-bold">{todo.title}</h3>
        <p className="mb-2 text-sm">{todo.description}</p>
        <p className="text-sm text-slate-500 group-hover:text-white">
          {dayjs(todo.updatedAt).format("D MMM YY HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default TodoCard;
