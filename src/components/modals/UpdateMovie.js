import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import MovieForm from '../admin/MovieForm'
import { updateMovie } from '../../api/movie'

export default function UpdateMovie({ visible, toast, initialState, onSuccess, onClose }) {

  const [busy, setBusy] = useState(false)

  const handleSubmit = async (formData) => {
    setBusy(true)
    const { error, message, movie } = await updateMovie(initialState.id, formData)
    setBusy(false)
    if (error) return toast.error(error)

    toast.success(message)
    onSuccess(movie)
    onClose()
  }

  return (
    <ModalContainer visible={visible}>
      <MovieForm toast={toast} initialState={initialState} busy={busy} btnTitle="Update" onSubmit={!busy ? handleSubmit : null} />
    </ModalContainer>
  )
}
