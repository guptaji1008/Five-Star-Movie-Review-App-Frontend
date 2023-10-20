import React, { useEffect, useState } from 'react'
import { getRelatedMovie } from '../api/movie'
import MovieList from './users/MovieList'

export default function RelatedMovies({movieId, toast}) {
  const [movies, setMovies] = useState([])

  const fetchRelatedMovies = async (id) => {
    const { relatedMovies, error } = await getRelatedMovie(id)
    if (error) toast.error(error)

    setMovies([...relatedMovies])
  }

  useEffect(() => {
    if(movieId) fetchRelatedMovies(movieId)
  }, [movieId])

  return <MovieList title="Related Movies" movies={movies} />
}
