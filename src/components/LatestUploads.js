import React, { useEffect, useState } from "react";
import MovieItemList from "./MovieItemList";
import { useMovies } from "../hooks";


export default function LatestUploads({toast}) {

  // Created a custom hook named "useMovies" for fetching latest uploaded movies, all the movies, related genres movies and many more information about movie
  
  const { recentlyUploadedMovie, latestUpload } = useMovies()

  useEffect(() => {
    recentlyUploadedMovie()
  })

  return (
    <div className="bg-gray-200 shadow dark:bg-gray-800 p-5 rounded col-span-2">
      <p className="font-semibold text-2xl mb-5 text-primary dark:text-white">
        Recently Uploaded
      </p>
      {
        latestUpload.map(m => <MovieItemList
          id={m.id}
          movie={m}
          toast={toast}
          />)
      }
    </div>
  );
}


