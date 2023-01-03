import axios from "axios";
import React, { useEffect, useState } from "react";
import getGenreFromId from "../../../lib/getGenreFromId";
import getMovieFromGenre from "../../../services/getMovieFromGenre";
import { Movie } from "../../../types";
import Card from "../Card";

export default function Movies({
  genre,
  onClick,
}: {
  genre: number;
  onClick?: (id: number) => void;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    getMovieFromGenre(genre).then((data) => {
      setMovies(data);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-medium text-white mb-4 font-poppins">
        {getGenreFromId(genre)}
      </h1>
      <div className="flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
        {movies &&
          movies.map((movie) => (
            <div
              onClick={() => onClick?.(movie.id)}
              key={movie.id}
              className="mr-6 "
            >
              <Card movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}
