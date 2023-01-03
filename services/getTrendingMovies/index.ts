import axios from "axios";

const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=7d5a4685cad956c47dea7747727480e9&include_adult=false`
  );
  return data.results;
};

export default getTrendingMovies;
