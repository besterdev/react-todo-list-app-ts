import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormTodo } from "../models";

import TextArea from "../../../components/TextArea";
import TextField from "../../../components/TextField";

interface Props {
  todo: FormTodo;
  onSubmit: (todo: any) => void;
}

const schema = yup
  .object({
    title: yup.string().required().trim(),
    description: yup.string().required().trim(),
  })
  .required();

const TodoForm = ({ todo, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: todo, resolver: yupResolver(schema) });

  useEffect(() => {
    reset(todo);
  }, [todo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-6 px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-medium uppercase text-slate-800">
          Create Task
        </h2>
        <TextField
          className="mb-2"
          label="title"
          type="text"
          register={register}
          error={errors.title?.message}
          required
        />
        <TextArea
          className="mb-4"
          label="description"
          register={register}
          error={errors.description?.message}
          required
        />
        <button
          className="box w-full rounded-lg border-none bg-gradient-to-r from-pink-500 via-violet-400 to-pink-500 bg-size-200 bg-pos-0 px-5 py-2.5 text-sm font-medium text-white shadow-lg  transition-all duration-500 hover:bg-pos-100"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
