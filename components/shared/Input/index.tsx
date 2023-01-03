import React from "react";

export default function Input({
  onChange,
  placeholder,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <input
      className="bg-transparent mb-4 focus:outline-none focus:shadow-outline border border-zinc-800 py-3 px-3 block w-[24em] appearance-none leading-normal placeholder:text-zinc-800"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
