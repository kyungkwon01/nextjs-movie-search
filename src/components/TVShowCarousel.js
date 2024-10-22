import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getTrendingTVShows } from "@/pages/api/tv-shows";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TVShowCarousel() {
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const router = useRouter();
  const sliderRef = useRef(null);
  const dragStartRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    getTrendingTVShows().then((tvShows) => {
      setTrendingTVShows(tvShows);
    });
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

  const handleMouseUp = (tvShowId, event) => {
    const start = dragStartRef.current;
    if (start && !isDraggingRef.current) {
      const end = { x: event.clientX, y: event.clientY };
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      if (distance < 5) {
        router.push(`/tv-shows/${tvShowId}`);
      }
    }
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Trending TV Shows
        </h2>
        <Slider ref={sliderRef} {...settings} className="movie-carousel">
          {trendingTVShows.map((tvShow) => (
            <div key={tvShow.id} className="px-2">
              <div
                className=" transform transition-transform duration-300 hover:scale-105"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={(e) => handleMouseUp(tvShow.id, e)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                    alt={tvShow.name}
                    width={300}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-white truncate text-center">
                {tvShow.name}
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

export default TVShowCarousel;
