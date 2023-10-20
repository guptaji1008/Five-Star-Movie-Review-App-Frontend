import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicMovie } from "../../api/movie";
import MovieList from "./MovieList";
import Container from "../Container";

export default function SearchMovies({ toast }) {
  const [movies, setMovies] = useState([]);

  const [searchParams] = useSearchParams();
  let query = searchParams.get("title");

  const searchMovies = async (val) => {
    const { error, results } = await searchPublicMovie(val);
    if (error) return toast.error(error);

    if (!results.length) return;

    setMovies([...results]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  if (!movies.length) {
    return (
      <div className="dark:bg-primary bg-white min-h-screen py-20">
        <p className="text-4xl text-center dark:text-white text-primary opacity-50">
        No Record Found
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <MovieList movies={movies} />
      </Container>
    </div>
  );
}
