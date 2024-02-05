import React from "react";
import { Loader } from "../Loader/Loader";

export const Button = ({
  title,
  isLoading,
  handleClick,
  additionalClass,
}: {
  title: string;
  handleClick: () => void;
  isLoading?: boolean;
  additionalClass?: string;
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className={`${additionalClass} ${
        isLoading ? "cursor-not-allowed opacity-50" : ""
      } relative h-12 inline-flex items-center w-full justify-center p-0.5 mt-4 mb-4 me-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800`}
    >
      <span
        className={`${
          isLoading ? "pointer-events-none" : ""
        } flex items-center  justify-center relative px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`}
      >
        {isLoading ? <Loader message="" isButton={true} /> : null}
        <span>{title}</span>
      </span>
    </button>
  );
};
