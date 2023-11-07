import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import Container from '../Container'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '../../hooks'
import AppSearchForm from '../form/AppSearchForm'

export default function Navbar() {

  // useAuth is a custom hook where where is profile information of the profile of the user :- 
  // 1. authInfo = {profile, isLoggedIn, isPending, role}
  // 2. handleLogin, handleLogout, isAuth
  const { authInfo, handleLogout } = useAuth()
  const { isLoggedIn } = authInfo

  const { toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleOnSubmit = (value) => {
    navigate('/movie/search?title=' + value)
  }

  const handleOnReset = () => {
    navigate('/')
  }


  return (
    <div className='dark:bg-secondary bg-slate-100 drop-shadow-lg'>
      {/* Container is a component for centering the div */}
      <Container className='p-2'>
        <div className="flex justify-between items-center">
          <div className='bg-blue-800 py-1 lg:px-6 px-3 rounded-3xl hover:drop-shadow-xl hover:-translate-y-0.5 transition'><Link to="/"><img src="./logo.png" alt="" className='h-10' /></Link></div>
          <ul className='flex items-center lg:space-x-5 md:space-x-3 space-x-1'>
            <li>
              {/* created toggle system for dark mode and light mode */}
              <button onClick={toggleTheme} className='bg-transparent p-1 rounded lg:text-2xl text-lg'>
                <BsFillSunFill className='dark:text-white text-primary' />
              </button>
            </li>
            <li>
              {/* AppSearchForm is a component of searching, where you can just type the first letter of the movie you want to search and enter and you will get recommendation */}
              <AppSearchForm placeholder="Search.." onSubmit={handleOnSubmit} onReset={handleOnReset} />
            </li>
            <li>
              <div>
                {
                  isLoggedIn ? <button className='dark:text-white text-primary font-semibold text-lg bg-transparent' onClick={handleLogout} >Log Out</button> : <Link className='dark:text-white text-primary font-semibold text-lg' to="auth/signin">Log In</Link>
                }
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  )
}
