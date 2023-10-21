import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks'
import Container from './Container'
import { useLocation, useNavigate } from 'react-router-dom'
import TopRatedMovies from './users/TopRatedMovies'
import HeroSlideShow from './users/HeroSlideShow'
import { ImSpinner } from 'react-icons/im'

export default function Home({toast}) {

  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo
  const isVerified = authInfo.profile?.isVerified
  const [load, setLoad] = useState(false)
  const [slideLoad, setSlideLoad] = useState(false)

  const navigate = useNavigate()
  const { state } = useLocation()

  const message = state?.message

  

  
  // useEffect(() => {
  //    toast.success(message)
  // }, [message])

  const handleNavigation = () => {
    navigate("/auth/emailverification", { state: { user: authInfo.profile, through: "verify" } })
  }

  if (!load && !slideLoad) return <div className='dark:bg-primary items-center justify-center bg-white min-h-screen'>
    <p className='text-center dark:text-white text-primary py-10 text-5xl'> <ImSpinner className='animate-spin' /> </p>
  </div>

  return (
    <div className='dark:bg-primary bg-white min-h-screen'>
      <Container>
        {
          isLoggedIn && !isVerified ? (
            <p className='text-xl text-center dark:text-white text-primary '>It looks like your account is not verified. <span><button onClick={handleNavigation} className='bg-transparent text-blue-600 hover:underline transition'>Click here</button></span> to verify</p>
          ) : null
        }
        <div>
          {/* slider */}
          <HeroSlideShow toast={toast} slideLoad={setSlideLoad}  />
          {/* Most Rated Movies */}
          <TopRatedMovies toast={toast} load={setLoad} />
        </div>
      </Container>
    </div>
  )
}
