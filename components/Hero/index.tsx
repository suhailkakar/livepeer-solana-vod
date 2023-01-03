import React, { useEffect, useState } from "react";
import getGenreFromId from "../../lib/getGenreFromId";
import getTrendingMovies from "../../services/getTrendingMovies";
import { Movie } from "../../types";
import Button from "../shared/Button";

export default function Hero() {
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = async () => {
    getTrendingMovies().then((res) => {
      setMovie(res[0]);
    });
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <div className="h-[40rem]  w-full ml  max-h-[40rem] relative">
      <img
        src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`}
        className="object-cover h-[40rem] w-full max-h-[40rem]  -center absolute top-0 left-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l p-48 from-transparent to-[#000000]">
        <div>
          {movie?.genre_ids.map((genre, index) => (
            <span
              key={index}
              className="uppercase text-gray-200 text-md font-sans "
            >
              {getGenreFromId(genre)}
              {index !== movie.genre_ids.length - 1 && (
                <span className="ml-3 mr-3">|</span>
              )}
            </span>
          ))}
        </div>
        <h1 className="text-6xl font-semibold text-white mt-4 mb-4 w-[70%]">
          {movie?.title}
        </h1>
        <div>
          <span className="text-gray-200 text-sm font-sans">
            {String(movie?.release_date).split("-")[0]}
            <span className="text-gray-200 ml-3 mr-3">|</span>
            {movie?.vote_average.toFixed(1)}
            <span className="text-gray-200  ml-3 mr-3">|</span>
            167 min
          </span>
        </div>
        <div className="mt-8">
          <Button>Watch Now</Button>
          <Button secondary>Learn More</Button>
        </div>
      </div>
    </div>
  );
}
