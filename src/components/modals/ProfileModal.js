import React, { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer'
import { getSingleActorProfile } from '../../api/actor'

export default function ProfileModal({visible, profileId, onClose, toast}) {

  const [profile, setProfile] = useState({})

  const fetchActorProfile = async (id) => {
    const { error, actor } = await getSingleActorProfile(id)
    if (error) return toast.error(error)
    setProfile({ ...actor })
  }

  useEffect(() => {
    if (profileId) fetchActorProfile(profileId)
  }, [profileId])

  const { avatar, name, about } = profile

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <div className='w-72 flex flex-col items-center space-y-3 p-5 rounded dark:bg-primary bg-white drop-shadow-lg'>
        <img className='h-36 w-36 rounded-3xl' src={avatar?.url} alt="" />
        <p className='text-xl dark:text-white text-primary font-semibold'>{name}</p>
        <p className='dark:text-dark-subtle text-light-subtle'>{about}</p>
      </div>
    </ModalContainer>
  )
}
