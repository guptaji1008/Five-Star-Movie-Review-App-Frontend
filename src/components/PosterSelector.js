import React from 'react'

const commonPosterUIClasses = 'flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle'

export default function PosterSelector({name, selectedPoster, onChange, accept, className, label}) {
  return (
    <div>
      <input accept={accept} name={name} onChange={onChange} type="file" hidden id={name} />
      <label htmlFor={name}>
        { selectedPoster ? <img className={commonPosterUIClasses + ' object-cover ' + className} src={selectedPoster} alt="" /> : <PosterUI className={className} label={label}/> }
      </label>
    </div>
  )
}

const PosterUI = ({className, label}) => {
    return (
        <div className={commonPosterUIClasses + ' ' + className}>
            <span className='dark:text-dark-subtle text-light-subtle'>{label}</span>
        </div>
    )
}
