
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const BlueButton: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#224ead] hover:bg-[#224eadde] hover:scale-105 text-white px-4 py-2 rounded mr-3 transition duration-300 ease-in-out w-[150px] h-[50px] flex justify-center items-center ${className}`}
    >
      {children}
    </button>
  );
}

export default BlueButton;