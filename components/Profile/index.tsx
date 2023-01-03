import React, { useState } from "react";

export default function Profile() {
  return (
    <div className="w-full -ml-20">
      <div className="flex flex-col justify-center items-center h-screen w-full -ml-18">
        <h1 className="text-white text-4xl font-regular ">Who is watching?</h1>
        <div className="mt-8 flex flex-row">
          <div className="flex flex-col justify-center items-center ml-6">
            <img src="/avatars/1.png" className="rounded-sm h-40 w-40" />
            <p className="text-zinc-600 text-xl font-regular mt-2">John</p>
          </div>
          <div className="flex flex-col justify-center items-center ml-6">
            <img src="/avatars/60.png" className="rounded-sm h-40 w-40" />
            <p className="text-zinc-600 text-xl font-regular mt-2">Bob</p>
          </div>
          <div className="flex flex-col justify-center items-center ml-6">
            <img src="/avatars/5.png" className="rounded-sm h-40 w-40" />
            <p className="text-zinc-600 text-xl font-regular mt-2">Michelle</p>
          </div>
          <div className="flex flex-col justify-center items-center ml-6">
            <img src="/avatars/37.png" className="rounded-sm h-40 w-40" />
            <p className="text-zinc-600 text-xl font-regular mt-2">Mary</p>
          </div>
        </div>
      </div>
    </div>
  );
}
