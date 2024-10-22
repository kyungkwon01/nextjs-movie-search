import MainCarousel from "@/components/MainCarousel";
import MovieCarousel from "@/components/MovieCarousel";
import TVShowCarousel from "@/components/TVShowCarousel";

export default function Home() {
  return (
    <div>
      <MainCarousel />
      <MovieCarousel />
      <TVShowCarousel />
    </div>
  );
}
