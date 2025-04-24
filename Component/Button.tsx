import React from "react";

interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
      {label}
    </button>
  );
};

export default Button;
