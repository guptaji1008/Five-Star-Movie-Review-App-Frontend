import React, { useEffect, useState } from 'react'
import { getTopRatedMovies } from '../../api/movie'
import MovieList from './MovieList'

export default function TopRatedMovies({toast, load}) {

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

  useEffect(() => {
    if (movies.length) load(true)
  }, [movies.length])

  return <MovieList movies={movies} title="Viewers choice (Movies)" />
}
