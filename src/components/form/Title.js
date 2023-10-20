import React from 'react'

export default function Title({children, className}) {
  return (
    <div>
      <h1 className={`text-3xl dark:text-white text-primary font-semibold text-center ${className}`}>
        {children}
      </h1>
    </div>
  )
}
