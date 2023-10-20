import React from 'react'
import { ImSpinner } from 'react-icons/im'

export default function Submit({value, busy, type, onClick}) {
  return <button type={type || "submit"} onClick={onClick}
  className='w-full rounded dark:bg-white bg-primary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex justify-center items-center mt-7 mb-5' 
  >
    {busy ? <ImSpinner className='animate-spin'/> : value}
  </button>
}
