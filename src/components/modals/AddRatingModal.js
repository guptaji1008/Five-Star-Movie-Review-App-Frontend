import React, { useState } from 'react'
import ModalContainer from "./ModalContainer"
import RatingForm from '../form/RatingForm'
import { useParams } from 'react-router-dom'
import { addReview } from '../../api/review'

export default function AddRatingModal({toast, visible, onClose, onSuccess}) {
  const { movieId } = useParams()
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (data) => {
    setBusy(true)
    const { message, error, reviews } = await addReview(movieId, data)
    setBusy(false)
    if (error) return toast.error(error)

    toast.success(message)
    onClose()
    onSuccess(reviews)
  }

  return (
    <ModalContainer visible={visible} onClose={!busy ? onClose : null} ignoreContainer={true} >
      <RatingForm busy={busy} toast={toast} onSubmit={handleSubmit} />
    </ModalContainer>
  )
}
