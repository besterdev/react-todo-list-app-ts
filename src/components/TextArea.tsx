import React from "react";

interface Props {
  label: string;
  placeholder?: string;
  className?: string;
  error?: string;
  register: any;
  required: boolean;
}

const TextArea: React.FC<Props> = ({
  label,
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
      <textarea
        rows={4}
        className={`scrollbar mb-1 block h-32 w-full resize-none overflow-y-scroll rounded-lg border p-2.5 text-sm ${
          error
            ? "border-red-500 bg-red-50 text-red-500 caret-current outline-red-500"
            : "border-gray-300 bg-gray-50 text-gray-900 caret-pink-500 outline-pink-500/50 focus:bg-white"
        }`}
        placeholder={placeholder}
        {...register(label, { required })}
      />
      <p className={`text-xs  ${error ? "text-red-500" : "text-transparent"}`}>
        {error ? error : "-"}
      </p>
    </div>
  );
};

export default TextArea;
