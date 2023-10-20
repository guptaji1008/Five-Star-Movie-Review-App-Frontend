import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function AppSearchForm({ placeholder, onSubmit, onReset }) {

  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
  }

  const handleReset = () => {
    setValue('')
    onReset()
  }

  return (
    <form className='relative' onSubmit={handleSubmit}>
      <input
          className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={({target}) => setValue(target.value)}
        />
        {value !== '' ? <button type='button' onClick={handleReset} className='absolute right-3 top-1/2 -translate-y-2 dark:text-dark-subtle text-secondary dark:hover:text-white hover:text-primary transition'><AiOutlineClose /></button> : null}
    </form>
  )
}
