import { Movie } from "../types";

export const getPoster = (movie: Movie) => {
  return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
};
