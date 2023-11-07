import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import { useAuth } from "../../hooks";
import AddRatingModal from "../modals/AddRatingModal";
import ProfileModal from "../modals/ProfileModal";

export default function SingleMovie({toast}) {
  // creating a ready state :
  const [ready, setReady] = useState(false);
  // Movie information will be added in this "movie" state
  const [movie, setMovie] = useState({});
  // creating a state which if true will pop up rating modal
  const [showRatingModal, setShowRatingModal] = useState(false);
  // creating a state which if true will pop up actor profile modal
  const [showActorProfileModal, setShowActorProfileModal] = useState(false);
  // selectedProfile is a state in which actor profile information is given
  const [selectedProfile, setSelectedProfile] = useState({});

  // getting movieId from url :
  const { movieId } = useParams();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  // fetching movie's all information from database using movieId
  const fetchMovie = async (id) => {
    const { movie, error } = await getSingleMovie(id);
    if (error) return toast.error(error);

    setReady(true);
    setMovie(movie);
    console.log(movie);
  };

  // Everytime movieId changes, fetchMovie function will work
  useEffect(() => {
    if (movieId) fetchMovie(movieId);
  }, [movieId]);

  const convertReviewCount = (count) => {
    if (!count) return 0;
    if (count <= 999) return count;
    return parseFloat(count / 1000).toFixed(2) + "k";
  };

  const dateConversion = (date) => {
    return date.substring(0, 10);
  };

  const handleRatingButton = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const handleRefresher = (reviews) => {
    setMovie({ ...movie, reviews });
  };

  const handleActorProfile = async (profile) => {
    setSelectedProfile(profile);
    setShowActorProfileModal(true);
  };

  const handleReviewButton = (id) => {
    navigate('/movie/reviews/' + id)
  }

  // if not ready, then we will send "Please Wait" message
  if (!ready) {
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle text-3xl animate-pulse">
          Please Wait...
        </p>
      </div>
    );
  }

  const {
    id,
    trailer,
    poster,
    title,
    reviews,
    storyLine,
    director,
    writers,
    cast,
    language,
    releaseDate,
    genres,
    type,
  } = movie;

  return (
    <>
      <div className="dark:bg-primary bg-white">
        <Container className="py-5 lg:w-8/12 w-11/12">
          {/* adding video player for trailer */}
          <video poster={poster} controls src={trailer}></video>
          {/* rest all the information related to movie like star cast, directors, producers, writers all are mentioned below */}
          <div className="flex justify-between items-center">
            <p className="text-4xl dark:text-gray-200 text-secondary font-semibold">
              {title}
            </p>
            <div className="py-2">
              <div className="flex lg:flex-row flex-col-reverse items-center space-x-4">
                <button
                  className="dark:hover:text-blue-600 hover:text-blue-600 transition dark:text-white text-primary"
                  type="button"
                  onClick={() => handleReviewButton(id)}
                >
                  {convertReviewCount(reviews.reviewCount)} reviews
                </button>
                <RatingStar rating={reviews.ratingAvg} />
              </div>
              <button
                className="dark:text-white text-primary text-lg dark:hover:text-blue-600 hover:text-blue-600 transition font-semibold"
                type="button"
                onClick={handleRatingButton}
              >
                Rate The Movie
              </button>
            </div>
          </div>
          <div className="space-y-2 mb-10">
            <p className="text-light-subtle dark:text-dark-subtle">
              {storyLine}
            </p>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Director :
              </p>
              <p
                onClick={() => handleActorProfile(director)}
                className="text-light-subtle dark:text-dark-subtle hover:dark:text-white hover:text-primary cursor-pointer transition"
              >
                {director.name}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Writers :
              </p>
              <div className="flex items-center space-x-3">
                {writers.map((w, ind) => {
                  return (
                    <p
                      key={ind}
                      className="text-light-subtle dark:text-dark-subtle hover:dark:text-white hover:text-primary cursor-pointer transition"
                      onClick={() => handleActorProfile(w)}
                    >
                      {w.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Cast :
              </p>
              <div className="flex items-center space-x-3">
                {cast.map((c, ind) => {
                  if (c.leadActor)
                    return (
                      <p
                        key={ind}
                        className="text-light-subtle dark:text-dark-subtle hover:dark:text-white hover:text-primary cursor-pointer transition"
                        onClick={() => handleActorProfile(c.profile)}
                      >
                        {c.profile.name}
                      </p>
                    );
                })}
              </div>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Language :
              </p>
              <p className="text-light-subtle dark:text-dark-subtle">
                {language}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Release Date :
              </p>
              <p className="text-light-subtle dark:text-dark-subtle">
                {dateConversion(releaseDate)}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Genres :
              </p>
              <div className="flex items-center space-x-3">
                {genres.map((genre, ind) => {
                  return (
                    <p
                      key={ind}
                      className="text-light-subtle dark:text-dark-subtle"
                    >
                      {genre}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Type :
              </p>
              <p className="text-light-subtle dark:text-dark-subtle">{type}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold dark:text-white text-primary mb-7">
            Top Cast :
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-7">
            {cast.map((c, ind) => {
              return (
                <div
                  onClick={() => handleActorProfile(c.profile)}
                  key={ind}
                  className="flex items-center justify-center mb-3 cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      className="aspect-square object-cover h-24 w-24 rounded-full"
                      src={c.profile.avatar}
                      alt={c.profile.name}
                    />
                    <p className="text-primary dark:text-white text-lg">
                      {c.profile.name}
                    </p>
                    <p className="text-primary dark:text-white opacity-40">
                      {c.roleAs}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <div className="px-16">
          {/* All the movies which have similar genre (atleast one), that movie will be mentioned here */}
          <RelatedMovies movieId={movieId} toast={toast} />
        </div>
        {/* this is a pop up modal which will be for rating the movie with the specific id */}
        <AddRatingModal
          toast={toast}
          visible={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSuccess={handleRefresher}
        />
        {/* profile modal is for about actor information with profile picture */}
        <ProfileModal
          visible={showActorProfileModal}
          onClose={() => setShowActorProfileModal(false)}
          profileId={selectedProfile.id}
          toast={toast}
        />
      </div>
    </>
  );
}
