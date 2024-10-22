import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getPopularMovies } from "@/pages/api/movies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainCarousel() {
  const [popularMovies, setPopularMovies] = useState([]);
  const router = useRouter();
  const dragStartRef = useRef(null);

  useEffect(() => {
    getPopularMovies().then((movies) => setPopularMovies(movies));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    swipe: true,
    touchThreshold: 10,
  };

  const handleMouseDown = (event) => {
    if (event.button === 0)
      dragStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = (movieId, event) => {
    const start = dragStartRef.current;
    if (start) {
      const end = { x: event.clientX, y: event.clientY };
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      if (distance < 5) {
        router.push(`/movies/${movieId}`);
      }
      dragStartRef.current = null;
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="">
        <Slider {...settings}>
          {popularMovies.map((movie) => (
            <div key={movie.id} className="focus:outline-none">
              <div
                className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] rounded-lg overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(movie.id, e)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${
                    movie.backdrop_path || movie.poster_path
                  }`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg select-none"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,..."
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 line-clamp-3 md:line-clamp-4 max-w-3xl mb-4">
                    {movie.overview}
                  </p>
                  <button
                    onClick={(e) => handleButtonClick(e, movie.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MainCarousel;
