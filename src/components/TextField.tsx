import React from "react";

interface Props {
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  className?: string;
  error?: string;
  register: any;
  required: boolean;
}

const TextField: React.FC<Props> = ({
  label,
  type = "text",
  placeholder,
  className,
  error,
  register,
  required,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor="email"
        className={`mb-2 block text-sm font-medium   ${
          error ? "text-red-500" : "text-gray-800"
        }`}
      >
        {label}
      </label>
      <input
        className={`mb-1 block w-full rounded-lg border p-2.5 text-sm ${
          error
            ? "border-red-500 bg-red-50 text-red-500 caret-current outline-red-500"
            : "border-gray-300 bg-gray-50 text-gray-900 caret-pink-500 outline-pink-500/50 focus:bg-white"
        }`}
        type={type}
        placeholder={placeholder}
        {...register(label, { required })}
      />
      <p className={`text-xs  ${error ? "text-red-500" : "text-transparent"}`}>
        {error ? error : "-"}
      </p>
    </div>
  );
};

export default TextField;
