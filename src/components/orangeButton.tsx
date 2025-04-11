
import React from "react";
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const OrangeButton: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(`bg-[#C97538] hover:bg-[#c97438d7] hover:scale-105 hover:cursor-pointer text-white px-4 py-2 rounded mr-3 transition duration-300 ease-in-out w-[150px] h-[50px] flex justify-center items-center ${className}`)}
    >
      {children}
    </button>
  );
}

export default OrangeButton;