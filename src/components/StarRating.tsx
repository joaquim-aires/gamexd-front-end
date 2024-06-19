/* eslint-disable react/prop-types */

import { HTMLProps } from 'react'
import { BiSolidStar } from 'react-icons/bi'

type props = {
  rating: number
} & HTMLProps<HTMLDivElement>

const StarRating = ({ rating, ...props }: props) => {
  // Assume you have a StarRating component implementation
  return (
    <div className="inline-flex items-center gap-1" {...props}>
      <div className="inline-flex items-center cursor-pointer">
        {['', '', '', '', ''].map((_, index) => (
          <BiSolidStar
            key={index}
            size={20}
            className={index + 1 > rating ? 'fill-neutral-900/50' : 'fill-miscelaneous-game'}
          /> // Ensure to provide a unique key prop for each component
        ))}
      </div>
      <p>
        {rating.toFixed(1)} <span className="sr-only">Stars</span>
      </p>
    </div>
  )
}

export default StarRating
