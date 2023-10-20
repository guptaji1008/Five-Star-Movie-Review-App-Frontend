import React from 'react'

export default function NextAndPrevButton({ onNextClick, onPrevClick, className }) {
  return (
      <div className={className + " justify-end mr-5 flex items-center space-x-6"}>
        <button onClick={onPrevClick} className="dark:text-white text-primary hover:text-opacity-80" type="button">Prev</button>
        <button onClick={onNextClick} className="dark:text-white text-primary hover:text-opacity-80" type="button">Next</button>
      </div>
  )
}
