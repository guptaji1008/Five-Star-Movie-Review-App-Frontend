import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import ActorForm from "../form/ActorForm";
import { createActor } from "../../api/actor";

export default function ActorUpload({ visible, onClose, toast }) {

  const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data) => {
      setIsLoading(true)
      const { actorInfo, error } = await createActor(data)
      setIsLoading(false)
      if (error) return toast.error(error)

      toast.success("Actor created successfully!")
      onClose()
    }

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer={true}
    >
        <ActorForm title="Create New Actor" loading={isLoading}  btnTitle="Create" onSubmit={handleSubmit} toast={toast} />
    </ModalContainer>
  );
}
