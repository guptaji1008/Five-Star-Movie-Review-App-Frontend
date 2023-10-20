import React from 'react'
import GridContainer from '../GridContainer'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import RatingStar from '../RatingStar'
import { getPosters } from '../../utils/helper'

const trimTitle = (title) => {
    if (title.length <= 20) return title
    return title.substring(0, 20) + '...'
  }

export default function MovieList({title, movies = []}) {

  if (!movies.length) return null

  return (
    <div className='py-5'>
      <h1 className='lg:text-start md:text-start text-center text-2xl dark:text-white text-secondary font-semibold'>{title}</h1>
      <GridContainer className="py-5">
        {movies.map((movie) => {
          return <ListItems key={movie.id} movie={movie} />
        })}
      </GridContainer>
    </div> 
  )
}

const ListItems = ({ movie }) => {

    const { id, poster, title, reviews, responsivePosters } = movie

    return <Link to={`/movie/${id}`} >
    <img className='aspect-video object-cover rounded w-full' src={getPosters(responsivePosters) || poster} alt={movie.title} />
    <div className='flex items-center justify-between'>
      <h1 className='text-lg font-semibold dark:text-white text-primary'>{trimTitle(title)}</h1>
      <RatingStar rating={reviews.ratingAvg} />
    </div>
  </Link>
}
