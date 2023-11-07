import React, { useEffect } from "react";
import MovieItemList from "../MovieItemList";
import NextAndPrevButton from "../NextAndPrevButton";
import { useMovies } from "../../hooks";


export default function Movies({toast}) {

  // destructuring movies, fetchMovie, fetchNextPage, fetchPrevPage
  const { movies, fetchMovie, fetchNextPage, fetchPrevPage } = useMovies()
  useEffect(() => {
    fetchMovie()
  }, []);


  return (
    <>
      <div>
        {movies.map((movie) => {
          return (
            <div className="bg-gray-200 shadow dark:bg-gray-800 transition p-3 rounded mb-2">
              <MovieItemList
                key={movie.id}
                movie={movie}
                toast={toast}
              />
            </div>
          );
        })}
        <NextAndPrevButton
          className="mt-8"
          onNextClick={() => fetchNextPage()}
          onPrevClick={() => fetchPrevPage()}
        />
      </div>
    </>
  );
}
