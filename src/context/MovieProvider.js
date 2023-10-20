import React, { createContext, useState } from 'react'
import { getMovie, searchMovieForAdmin } from '../api/movie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MovieContext = createContext()

let currentPageNo = 0;
let limit = 5;

export default function MovieProvider({children}) {

  const [movies, setMovies] = useState([]);
  const [latestUpload, setLatestUpload] = useState([]);
  const [searchedMovie, setSearchMovie] = useState([])
  const [reachedToend, setReachedToEnd] = useState(false);

  const fetchMovie = async () => {
    const { movies, error } = await getMovie(currentPageNo, limit);
    if (error) return toast.error(error);

    if (!movies.length) {
      currentPageNo -= 1;
      return setReachedToEnd(true);
    }

    
    setMovies([...movies]);
};

  const recentlyUploadedMovie = async () => {
        const { movies, error } = await getMovie(0, 1)
    
        if (error) return toast.error(error)
        setLatestUpload([...movies])
    }

  const fetchNextPage = () => {
    if (reachedToend) return;
    currentPageNo += 1;
    fetchMovie(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (reachedToend) setReachedToEnd(false);
    if (currentPageNo <= 0) {
      currentPageNo = 0;
      return;
    }
    currentPageNo -= 1;
    fetchMovie(currentPageNo);
  };

  const changeLimit = (limitMovie) => {
    limit = limitMovie
  }

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) return toast.error(error);

    setSearchMovie([...results]);
  };

  return (
    <MovieContext.Provider value={{ movies, fetchMovie, fetchNextPage, fetchPrevPage, changeLimit, recentlyUploadedMovie, latestUpload, searchMovies, searchedMovie }}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MovieContext.Provider>
  )
}
