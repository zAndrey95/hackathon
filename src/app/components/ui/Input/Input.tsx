"use client";
import { ChangeEvent } from "react";

interface Props {
  isLoading?: boolean;
  handleChange: (str: string) => void;
  inputValue: string;
  placeholder?: string;
  label: string;
}
export const Input: React.FC<Props> = (props: Props) => {
  const { handleChange, inputValue, placeholder, label, isLoading } = props;
  return (
    <div>
      <label className="text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        placeholder={placeholder}
        disabled={isLoading}
        value={inputValue}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange(event.target.value)
        }
      />
    </div>
  );
};
