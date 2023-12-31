import React, { useEffect, useState } from 'react'
import { getTopRatedMovies } from '../../api/movie'
import MovieList from './MovieList'

export default function TopRatedMovies({toast}) {

  const [movies, setMovies] = useState([])

  const fetchMovies = async (signal) => {
    const { error, topRatedMovies } = await getTopRatedMovies('Film', signal)
    if (error) return toast.error(error)
    setMovies([...topRatedMovies])
  }

  useEffect(() => {
    const ac = new AbortController()
    fetchMovies(ac.signal)
    return () => {
      ac.abort()
    }
  }, [])

  return <MovieList movies={movies} title="Viewers choice (Movies)" />
}
