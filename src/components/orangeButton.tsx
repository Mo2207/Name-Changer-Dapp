
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const OrangeButton: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#C97538] hover:bg-[#c97438d7] hover:scale-105 text-white px-4 py-2 rounded mr-3 transition duration-300 ease-in-out w-[150px] h-[50px] flex justify-center items-center ${className}`}
    >
      {children}
    </button>
  );
}

export default OrangeButton;