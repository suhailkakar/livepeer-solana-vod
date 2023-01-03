import React from "react";

export default function Button({
  children,
  secondary,
}: {
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <button
      className={
        "font-medium py-3 px-5 rounded-md mr-4 " +
        (secondary ? " bg-[#ffffff68] text-white" : " bg-white text-black")
      }
    >
      {children}
    </button>
  );
}
