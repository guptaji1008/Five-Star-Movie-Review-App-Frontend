import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import ActorForm from "../form/ActorForm";
import { updateActor } from "../../api/actor";

export default function UpdateActor({ visible, onClose, initialState, onSuccess, toast }) {

  const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data) => {
      setIsLoading(true)
      const { actor, error } = await updateActor(initialState.id, data)
      setIsLoading(false)
      if (error) return toast.error(error)
      
      onSuccess(actor)
      toast.success("Actor updated successfully!")
      onClose()
    }

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer={true}
    >
        <ActorForm title="Update Actor" loading={isLoading} initialState={initialState}  btnTitle="Update" onSubmit={handleSubmit} toast={toast} />
    </ModalContainer>
  );
}
