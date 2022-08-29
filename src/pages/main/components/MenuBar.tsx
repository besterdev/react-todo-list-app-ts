interface Props {
  logout: () => void;
  handlerOpenTodoModal: () => void;
}

const MenuBar = ({ handlerOpenTodoModal, logout }: Props) => {
  return (
    <div className="sticky bottom-0 flex w-full items-end justify-center space-x-6">
      <button
        className="box group flex h-20 w-20 items-center justify-center rounded-full border-none bg-gradient-to-r from-pink-500 via-violet-400 to-pink-500 bg-size-200 bg-pos-0 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all  duration-500 hover:scale-110 hover:bg-pos-100"
        onClick={handlerOpenTodoModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 stroke-white"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        className="box group h-20 w-20 rounded-full border-none bg-gradient-to-r from-pink-500 via-violet-400 to-pink-500 bg-size-200 bg-pos-0 px-5 py-2.5 text-sm font-medium text-white shadow-lg  transition-all duration-500 hover:scale-110  hover:bg-pos-100"
        onClick={logout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 stroke-white"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default MenuBar;
