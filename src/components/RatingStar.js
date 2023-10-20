import React from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function RatingStar({ rating }) {

  if (!rating) return <p className='dark:text-white text-primary'>No Reviews</p>

  return (
      <div className='flex items-center space-x-1'>
        <span className='dark:text-white text-primary'>{rating}</span>
        <AiFillStar className='text-yellow-600' />
      </div>
  )
}
