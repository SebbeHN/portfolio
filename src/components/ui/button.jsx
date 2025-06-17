import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
