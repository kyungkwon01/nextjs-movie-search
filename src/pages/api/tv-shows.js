const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

const getTrendingTVShows = async () => {
  try {
    const response = await fetch(
      `${API_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getTrendingTVShows };
