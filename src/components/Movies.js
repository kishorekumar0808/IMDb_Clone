import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { addToCart, removeCartItem } from "../redux/slices/WishList";
import { Link } from "react-router-dom";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hovered, setHovered] = useState("");
  const dispatcher = useDispatch();
  const watchList = useSelector((state) => state.wishList);
  console.log(moviesData);

  const getTrendingMoviesData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=5a6e809a6376d537b15a7d290941d94b&page=${pageNumber}`
      )
      .then((response) => {
        setMoviesData(response.data.results);
      });
  };

  useEffect(() => {
    getTrendingMoviesData();
  }, [pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const addToWatchList = (movie) => {
    dispatcher(addToCart(movie));
  };

  const removeFromWatchList = (movie) => {
    dispatcher(removeCartItem(movie));
  };

  const showAddIcon = (movie) => {
    return <div onClick={() => addToWatchList(movie)}>+</div>;
  };

  const showRemoveIcon = (movie) => {
    return <div onClick={() => removeFromWatchList(movie)}>X</div>;
  };

  const isAddedToWatchList = (movieId) => {
    return watchList.some((movie) => {
      return movie.id === movieId;
    });
  };

  const showButton = (movieId) => {
    setHovered(movieId);
  };
  const removeButton = () => {
    setHovered("");
  };

  const getMovieCard = (movie) => {
    return (
      <Link to={`/movie/${movie.id}`}>
        <div
          key={movie.id}
          className="w-[160px] h-[30vh] bg-center bg-cover m-4 md:h-[40vh] md:w-[180px] relative rounded-xl hover:scale-110 duration-300 flex items-end cursor-pointer"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
          }}
          onMouseOver={() => showButton(movie.id)}
          onMouseLeave={removeButton}
        >
          <div
            className="text-2md p-1.5 bg-gray-200 rounded-md absolute top-2 right-2"
            style={{
              display: hovered === movie.id ? "block" : "none",
            }}
          >
            {isAddedToWatchList(movie.id)
              ? showRemoveIcon(movie)
              : showAddIcon(movie)}
          </div>
          <div className="text-white font-bold text-center w-full bg-opacity-60">
            {movie.original_title}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="text-2xl font-bold text-center m-8">Trending Movies</div>

      <div className="flex flex-wrap">
        {moviesData.map((movie) => {
          return getMovieCard(movie);
        })}
      </div>
      <Pagination
        pageNumberProp={pageNumber}
        onNext={nextPage}
        onPrevious={previousPage}
      />
    </div>
  );
};

export default Movies;
