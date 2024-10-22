const API_KEY = "1ea937ec587065f0e2398088050ff0c4";
const API_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&region=US`
    );
    const data = await response.json();
    return data.results.slice(0, 8);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getTrendingMovies, getPopularMovies };
