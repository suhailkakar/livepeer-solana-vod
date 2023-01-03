import React from "react";

export default function SearchInput({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-[50em] ">
      <input
        type="text"
        onChange={onChange}
        placeholder="Search for a movie or tv show"
        className="w-full h-20 rounded-full  p-10 text-3xl font-regular bg-black text-white focus:outline-none"
      />
    </div>
  );
}
