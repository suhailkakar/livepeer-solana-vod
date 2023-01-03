import React from "react";
import { getPoster } from "../../../lib/getPoster";
import { Movie } from "../../../types";

export default function Card({ movie }: { movie: Movie }) {
  return (
    <div className="w-52 h-74 shadow-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out hover:cursor-pointer">
      <img src={getPoster(movie)} className="w-full h-full object-cover" />
    </div>
  );
}
