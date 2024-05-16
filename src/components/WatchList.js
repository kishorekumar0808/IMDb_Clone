import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../redux/slices/WishList";

const WatchList = () => {
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");
  const [rating, setRating] = useState(0);
  const [searchString, setSearchString] = useState("");
  const favorites = useSelector((state) => state.wishList);
  const dispatcher = useDispatch();

  useEffect(() => {
    let listOfListOfGenreIdsOfFavMovies = favorites.map(
      (movie) => movie.genre_ids
    );
    let listOfGenresFromAllMovies = listOfListOfGenreIdsOfFavMovies.reduce(
      (acc, t) => {
        let genreName = t.map((genreId) => genreIDs[genreId]);
        acc = [...acc, ...genreName];
        return acc;
      },
      []
    );
    let listOfUniqueGenre = new Set(listOfGenresFromAllMovies);
    setGenres(["All Genre", ...listOfUniqueGenre]);
  }, [favorites]);

  let genreIDs = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const setGenre = (genre) => {
    setCurrentGenre(genre);
  };

  const getGenreFilter = () => {
    return genres.map((genre) => {
      return (
        <button
          className={
            currentGenre === genre
              ? "m-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold"
              : "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
          }
          onClick={() => setGenre(genre)}
        >
          {genre}
        </button>
      );
    });
  };

  const removeFromWatchList = (movie) => {
    dispatcher(removeCartItem(movie));
  };

  let filteredArray = [];
  filteredArray =
    currentGenre === "All Genre"
      ? favorites
      : favorites.filter((movie) => {
          return movie.genre_ids.some((id) => {
            return genreIDs[id] === currentGenre;
          });
        });

  filteredArray = filteredArray.filter((movie) => {
    return movie.title.toLowerCase().includes(searchString.toLowerCase());
  });

  if (rating === 1) {
    filteredArray = filteredArray.sort((m1, m2) => {
      return m1.vote_average - m2.vote_average;
    });
  }

  if (rating === -1) {
    filteredArray = filteredArray.sort((m1, m2) => {
      return m2.vote_average - m1.vote_average;
    });
  }

  const getWatchListRow = (movie, key) => {
    return (
      <tr key={key}>
        <td className="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
          <img
            src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path}`}
            className="h-[6rem]  w-[6rem] object-fit bg-contain"
            alt="movie poster"
          />
          <div className="font-medium text-gray-700  text-sm">
            {movie.original_title}
          </div>
        </td>
        <td className=" pl-6 py-4">{movie.vote_average}</td>
        <td className=" pl-6 py-4">{movie.popularity}</td>
        <td className=" pl-6 py-4">
          {movie.genre_ids.map((id) => `${genreIDs[id]} `)}
        </td>
        <td className="py-4">
          <button
            className="text-red-600"
            onClick={() => removeFromWatchList(movie)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {getGenreFilter()}
      </div>

      <div className="text-center">
        <input
          type="text"
          className=" bg-gray-200 border-4 text-center m-2p-1 "
          placeholder="Search for Movies"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50 p-4">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    alt="Ascending"
                    className="mr-3 cursor-pointer"
                    onClick={() => setRating(1)}
                  />
                  <div>Ratings</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    alt="Descending"
                    className="ml-3 cursor-pointer"
                    onClick={() => setRating(-1)}
                  />
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredArray.map((movie) => {
              return getWatchListRow(movie, movie.id);
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
