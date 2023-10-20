import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NotFound from "../components/NotFound";
import Navbar from "../components/admin/Navbar";
import Header from "../components/admin/Header";
import MovieUpload from "../components/admin/MovieUpload";
import ActorUpload from "../components/modals/ActorUpload";
import { useSearch } from "../hooks";
import SearchMovies from "../components/admin/SearchMovies";

export default function AdminNavigator({toast}) {

  const { resetSearch } = useSearch()

  const [ showMovieUploadModal, setShowMovieUploadModal ] = useState(false)
  const [ showActorUploadModal, setShowActorUploadModal ] = useState(false)

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false)
    resetSearch()
  }

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true)
  }

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false)
  }

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true)
  }

  return (
    <>
      <div className="flex dark:bg-secondary bg-white min-h-screen">
        <div className="fixed">
          <Navbar />
        </div>
        <div className="flex-1 ml-60 mr-5 my-5">
          <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick={displayActorUploadModal}/>
          <Routes>
            <Route path="/" element={<Dashboard toast={toast} />} />
            <Route path="/movies" element={<Movies toast={toast} />} />
            <Route path="/actors" element={<Actors toast={toast} />} />
            <Route path="/search" element={<SearchMovies toast={toast} />} /> toast={toast}
            <Route path="*" element={<NotFound toast={toast} />} />
          </Routes>
        </div>
        <MovieUpload toast={toast} visible={showMovieUploadModal} onClose={hideMovieUploadModal} />
        <ActorUpload toast={toast} visible={showActorUploadModal} onClose={hideActorUploadModal} />
      </div>
    </>
  );
}
