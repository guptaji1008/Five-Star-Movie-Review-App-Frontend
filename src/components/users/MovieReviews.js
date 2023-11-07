import React, { useEffect, useState } from "react";
import Container from "../Container";
import { useParams, useNavigate } from "react-router-dom";
import RatingStar from "../RatingStar";
import { deleteReview, getReviewsByMovie, updateReview } from "../../api/review";
import { useAuth } from "../../hooks";
import MyReviewModal from "../modals/MyReviewModal";
import EditMyReviewModal from "../modals/EditMyReviewModal";
import ConfirmModal from "../modals/ConfirmModal";

export default function MovieReviews({toast}) {
  const [reviews, setReviews] = useState([])
  const [movieName, setMovieName] = useState('')
  const [myMovieReview, setMyMovieReview] = useState({})
  const [showMyReviewModal, setShowMyReviewModal] = useState(false)
  const [showEditMyReviewModal, setShowEditMyReviewModal] = useState(false)
  const [showDeleteMyReviewModal, setShowDeleteMyReviewModal] = useState(false)
  const [busy, setBusy] = useState(false)

  // fetching movie id from url
  const { movieId } = useParams()
  const { authInfo } = useAuth()
  const { profile, isLoggedIn } = authInfo
  const navigate = useNavigate()

  const fetchReviews = async (id) => {
    const { reviews, error, movieName } = await getReviewsByMovie(id)
    if (error) return toast.error(error)
    setReviews([ ...reviews ])
    setMovieName(movieName)
  }

  useEffect(() => {
    if (movieId) fetchReviews(movieId)
  }, [movieId])

  const getInitialName = (name) => {
    return name[0].toUpperCase();
  };

  const handleMyReviewButton = () => {
    // if not logged in then returning to signin page
    if (!isLoggedIn) return navigate('/auth/signin')
    // applying logic for extracting my review, if there exist my review or else sending message of 'You have not reviewed'
    const [myReview] = reviews.filter((r) => r.owner.ownerId === profile.id)
    if (!myReview) return toast.info("You have not reviewed!")
    // setting my review
    setMyMovieReview({ ...myReview })
    // setting modal to true
    setShowMyReviewModal(true)
  }

  const handleOnEditMyReviewButton = () => {
    setShowMyReviewModal(false)
    setShowEditMyReviewModal(true)
  }

  const handleOnDeleteMyReviewButton = () => {
    setShowMyReviewModal(false)
    setShowDeleteMyReviewModal(true)
  }

  const handleEditedReview = async (data) => {
    setBusy(true)
    const { message, error } = await updateReview(myMovieReview.reviewId, data)
    setBusy(false)
    if (error) return toast.error(error)
    toast.success(message)
    setShowEditMyReviewModal(false)
    setMyMovieReview({})
    fetchReviews(movieId)

  }

  const deleteMyReview = async () => {
    setBusy(true)
    const { message, error } = await deleteReview(myMovieReview.reviewId)
    setBusy(false)
    if (error) return toast.error(error)
    toast.success(message)
    setShowDeleteMyReviewModal(false)
    setMyMovieReview({})
    fetchReviews(movieId)
  }

  if (!reviews.length) {
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle text-3xl animate-pulse">
          No Records
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="py-5 lg:w-8/12 w-11/12 space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold dark:text-white text-primary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for :&nbsp;</span> {movieName} </p>
          <button className="dark:hover:text-blue-600 hover:text-blue-600 transition dark:text-white text-primary" onClick={handleMyReviewButton}>
            Find My Review
          </button>
        </div>
        <div className="space-y-3">
          {
            reviews.map((review) => {
                const { owner, content, rating, reviewId } = review
                return <div key={reviewId} className="flex items-center space-x-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-full text-2xl font-semibold bg-green-400 select-none">
                  <p>{getInitialName(owner.name)}</p>
                </div>
                <div className="">
                    <div className="flex items-center space-x-5">
                        <p className="text-lg dark:text-white text-primary">{owner.name}</p>
                        <RatingStar rating={rating} />
                    </div>
                    <p className="dark:text-white text-primary">{content}</p>
                </div>
              </div>
            })
          }
        </div>
      </Container>
      <MyReviewModal 
        visible={showMyReviewModal} 
        onClose={() => setShowMyReviewModal(false)}
        review={myMovieReview}
        onEditClick={handleOnEditMyReviewButton}
        onDeleteClick={handleOnDeleteMyReviewButton}
        />
        <EditMyReviewModal 
        visible={showEditMyReviewModal}
        onClose={() => setShowEditMyReviewModal(false)}
        review={myMovieReview}
        toast={toast}
        busy={busy}
        onSubmit={handleEditedReview}
        />
        <ConfirmModal 
        visible={showDeleteMyReviewModal}
        onCancel={() => setShowDeleteMyReviewModal(false)}
        title="Are you sure ?"
        subTitle="This will delete your review permanently"
        onConfirm={deleteMyReview}
        busy={busy}
        />
    </div>
  );
}
