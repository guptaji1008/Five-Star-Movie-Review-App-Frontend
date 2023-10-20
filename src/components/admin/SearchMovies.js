import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieItemList from "../MovieItemList";
import { useMovies } from "../../hooks";

export default function SearchMovies({toast}) {
  
  const { searchedMovie, searchMovies } = useMovies()

  const [searchParams] = useSearchParams();
  let query = searchParams.get("title");

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  return (
    <div>
      {searchedMovie.length ? searchedMovie.map((movie) => {
        return (
          <div className="bg-gray-200 shadow dark:bg-gray-800 p-3 rounded mb-3">
            <MovieItemList
              key={movie.id}
              movie={movie}
              toast={toast}
              query={query}
            />
          </div>
        );
      }) : <p className="text-5xl text-center dark:text-white text-primary text-opacity-0">No Record Found</p>}
    </div>
  );
}
