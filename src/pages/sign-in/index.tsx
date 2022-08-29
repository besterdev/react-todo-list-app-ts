import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import TextField from "../../components/TextField";

import { useAuth } from "../../hooks/useAuth";

interface FormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn: React.FC = () => {
  const { login }: any = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data: FormData) => {
    const { username, password } = data;
    signIn(username, password);
  });

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://candidate.neversitup.com/todo/users/auth",
        {
          username: username,
          password: password,
        }
      );
      const token = response.data.token;
      login(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center xl:flex-row xl:space-x-10">
      <div>
        <img
          src="/casual-life-3d-man-sitting-on-a-bench-with-laptop-with-legs-on-skateboard-1.png"
          alt=""
          className="w-80"
        />
      </div>
      <div className="w-full rounded-md p-10 xl:max-w-md">
        <form onSubmit={onSubmit}>
          <div className="mb-4 text-center text-4xl font-extrabold xl:text-left">
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Sign in to App
            </span>
          </div>
          <TextField
            className="mb-2"
            label="username"
            type="text"
            placeholder="example@email.com"
            register={register}
            error={errors.username?.message}
            required
          />
          <TextField
            className="mb-2"
            label="password"
            type="text"
            register={register}
            error={errors.password?.message}
            required
          />
          <button
            className="box w-full rounded-lg border-none bg-gradient-to-r from-pink-500 via-violet-400 to-pink-500 bg-size-200 bg-pos-0 px-5 py-2.5 text-sm font-medium text-white shadow-lg  transition-all duration-500 hover:bg-pos-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
