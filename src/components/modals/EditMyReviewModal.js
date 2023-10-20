import React from 'react'
import ModalContainer from './ModalContainer'
import RatingForm from '../form/RatingForm'

export default function EditMyReviewModal({ visible, onClose, review, toast, busy, onSubmit }) {

    const initialReviews = {
        content: review.content,
        rating: review.rating
    }

  return (
    <ModalContainer visible={visible} onClose={!busy ? onClose : null} ignoreContainer={true} >
      <RatingForm toast={toast} initialReviews={initialReviews} busy={busy} onSubmit={onSubmit} />
    </ModalContainer>
  )
}
