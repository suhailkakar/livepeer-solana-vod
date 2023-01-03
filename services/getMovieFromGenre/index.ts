import axios from "axios";

const getMovieFromGenre = async (genre: number) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=7d5a4685cad956c47dea7747727480e9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
  );
  return data.results;
};

export default getMovieFromGenre;
