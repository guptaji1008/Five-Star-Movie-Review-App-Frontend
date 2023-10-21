import React, { useEffect, useState } from 'react'
import { getTopRatedMovies } from '../../api/movie'
import MovieList from './MovieList'
import { ImSpinner } from 'react-icons/im'

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

  if (!movies.length) return <div className="flex justify-center items-center">
  <p className="dark:text-white text-primary opacity-70 text-2xl"> <ImSpinner className="animate-spin" /> </p>
</div>

  return <MovieList movies={movies} title="Viewers choice (Movies)" />
}
