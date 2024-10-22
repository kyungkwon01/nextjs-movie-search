import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getTrendingMovies } from "@/pages/api/movies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MovieCarousel() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const router = useRouter();
  const sliderRef = useRef(null);
  const dragStartRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    getTrendingMovies().then((movies) => setTrendingMovies(movies));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    drag: true,
    autoplay: false,
    swipe: true,
    touchThreshold: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px",
        },
      },
    ],
  };

  const handleMouseDown = (event) => {
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    isDraggingRef.current = false;
  };

  const handleMouseMove = (event) => {
    if (dragStartRef.current) {
      const dragDistance = Math.abs(event.clientX - dragStartRef.current.x);
      if (dragDistance > 5) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleMouseUp = (movieId, event) => {
    const start = dragStartRef.current;
    if (start && !isDraggingRef.current) {
      const end = { x: event.clientX, y: event.clientY };
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      if (distance < 5) {
        router.push(`/movies/${movieId}`);
      }
    }
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Trending Movies</h2>
        <Slider ref={sliderRef} {...settings} className="movie-carousel">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div
                className=" transform transition-transform duration-300 hover:scale-105"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={(event) => handleMouseUp(movie.id, event)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-white truncate text-center">
                {movie.title}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx>{`
        .movie-carousel .slick-track {
          display: flex !important;
          gap: 1rem;
        }
        .movie-carousel .slick-slide {
          height: inherit !important;
        }
        .movie-carousel .slick-center {
          transform: scale(1.1);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MovieCarousel;
