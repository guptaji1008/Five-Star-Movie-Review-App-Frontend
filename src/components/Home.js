import React from 'react'
import { useAuth } from '../hooks'
import Container from './Container'
import { useLocation, useNavigate } from 'react-router-dom'
import TopRatedMovies from './users/TopRatedMovies'
import HeroSlideShow from './users/HeroSlideShow'

export default function Home({toast}) {

  const { authInfo } = useAuth()
  const { isLoggedIn, profile } = authInfo
  const isVerified = authInfo.profile?.isVerified

  const navigate = useNavigate()
  const { state } = useLocation()

  const message = state?.message
  
  // useEffect(() => {
  //    toast.success(message)
  // }, [message])

  const handleNavigation = () => {
    navigate("/auth/emailverification", { state: { user: authInfo.profile, through: "verify" } })
  }

  return (
    <div className='dark:bg-primary bg-white min-h-screen'>
      <Container>
        {isLoggedIn && profile ? <p className='text-3xl dark:text-white text-primary py-3'>Hey {profile.name.split(" ")[0] || profile.name} 😊</p> : null}
        {
          isLoggedIn && !isVerified ? (
            <p className='text-xl text-center dark:text-white text-primary '>It looks like your account is not verified. <span><button onClick={handleNavigation} className='bg-transparent text-blue-600 hover:underline transition'>Click here</button></span> to verify</p>
          ) : null
        }
        <div>
          {/* slider */}
          <HeroSlideShow toast={toast} />
          {/* Most Rated Movies */}
          <TopRatedMovies toast={toast} />
        </div>
      </Container>
    </div>
  )
}
