'use client'

import { FC } from 'react'
import StarRatings from 'react-star-ratings'

interface IProps {
  rating: number
  ratingDigit: string
  changeRating?: (rating: number) => void
  readOnly: boolean
}

const Rating: FC<IProps> = ({
  rating,
  ratingDigit,
  changeRating,
  readOnly,
}) => {
  const dummyChangeRating = () => {}

  return (
    <div className='flex items-center gap-[9px]'>
      <span className='text-lg font-bold'>{ratingDigit}</span>
      <StarRatings
        rating={rating}
        starEmptyColor='#A0AEC0E5'
        starHoverColor='#FBE35B'
        starRatedColor='#FED65D'
        changeRating={readOnly ? dummyChangeRating : changeRating}
        numberOfStars={5}
        starSpacing='2px'
        name='rating'
        starDimension='20px'
      />
    </div>
  )
}

export default Rating
