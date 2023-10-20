import React, { useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { deleteMovie, getForUpdateMovie } from "../api/movie";
import UpdateMovie from "./modals/UpdateMovie";
import ConfirmModal from "./modals/ConfirmModal";
import { useMovies } from "../hooks";
import { getPosters } from "../utils/helper";

export default function MovieItemList({
  movie,
  toast,
  query
}) {

  const { fetchMovie, recentlyUploadedMovie, searchMovies } = useMovies()

  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleOnEditClick = async () => {
    const { forUpdateMovie, error } = await getForUpdateMovie(movie.id);
    if (error) return toast.error(error);
    setSelectedMovie(forUpdateMovie);
    setShowEditModal(true);
  }

  const handleOnDeleteConfirm = async () => {
    setBusy(true)
    const { message, error } = await deleteMovie(movie.id)
    setBusy(false)
    
    if (error) return toast.error(error)
    toast.success(message)
    setShowConfirmModal(false)
    fetchMovie()
    recentlyUploadedMovie()
    query && searchMovies(query)
  }

  const handleOnChange = () => {
    fetchMovie(); 
    recentlyUploadedMovie();
    query && searchMovies(query)
  }

  return (
    <>
      <MovieCard 
        movie={movie} 
        onEditClick={handleOnEditClick} 
        onDeleteClick={() => setShowConfirmModal(true)}
        />
      <UpdateMovie
        visible={showEditModal}
        onSuccess={handleOnChange}
        initialState={selectedMovie}
        toast={toast}
        onClose={() => setShowEditModal(false)}
      />
      <ConfirmModal 
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        title="Are you sure?"
        subTitle="This action will delete this movie permanently"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
      />
    </>
  );
}

const MovieCard = ({ movie, onEditClick, onDeleteClick }) => {

  const { poster, responsivePosters, title, genres = [], status } = movie;

  return (
    <table className="w-full border-b dark:border-white border-primary mb-3">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={getPosters(responsivePosters) || poster} alt={title} />
            </div>
          </td>
          <td className="w-full pl-5">
            <p className="font-semibold text-primary dark:text-white">
              {title}
            </p>
            <div className="space-x-2">
              {genres.map((g, ind) => (
                <span
                  key={ind}
                  className="text-primary dark:text-white text-xs"
                >
                  {g}
                </span>
              ))}
            </div>
          </td>
          <td className="px-7">
            <p className="dark:text-white text-primary">{status}</p>
          </td>
          <td className="w-28">
            <div className="w-full flex items-center dark:text-white text-primary space-x-2">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
