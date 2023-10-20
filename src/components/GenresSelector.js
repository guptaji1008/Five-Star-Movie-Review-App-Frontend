import React from 'react'
import { ImTree } from 'react-icons/im'

export default function GenresSelector({onClick, badge = 0}) {
  return (
    <div>
      <button onClick={onClick} className='py-1 px-3 flex items-center space-x-2 p-1 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary'>
      <ImTree />
      <span>Select Genres</span>
    </button>
    {badge ? <div
      className='dark:text-white text-primary ml-7'
    > <span>{badge === 1 ? `Genre : ${badge}` : `Genres : ${badge}`}</span> </div> : null}
    </div>
  )
}
