// Loader.tsx
import React from "react";

export const Loader: React.FC<{
  message: string;
  isButton?: boolean;
}> = (props: { message: string; isButton?: boolean }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-solid ${
          props.isButton ? "h-8 w-8" : "h-12 w-12"
        } mr-4`}
      ></div>
      <div>{props.message}</div>
    </div>
  );
};
