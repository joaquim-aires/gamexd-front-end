/* eslint-disable react/prop-types */

import Avatar from './Avatar'
import StarRating from './StarRating'

/*
  type friend = {
    name: string;
    avatarSource: string;
    rating: number;
  }
*/
const Card = ({ title, src, friend, ...props }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="relative rounded-lg overflow-hidden shadow-md flex flex-col w-[12rem] md:w-[12rem] h-[12rem] aspect-[12/19]"
        {...props}
      >
        {/* Title */}
        <p className="truncate px-2 py-1 shrink-0 bg-[linear-gradient(90deg,theme(colors.primary.600)_50%,theme(colors.primary.400)_100%)] text-neutral-50 border-b border-neutral-50">
          {title}
        </p>
        {/* Box Art */}
        <img className="object-top object-fill w-full h-full" src={src} />

        {/* Friend Tag */}
        {friend && (
          <div className="absolute bottom-2 pr-3 left-2 flex justify-center items-center gap-2 rounded-full shadow-[0_0_4px_2px_rgba(0,0,0,0.5)] text-neutral-50 bg-primary-400">
            <Avatar
              className="shadow-[0px_0px_0px_4px_theme(colors.primary.400)] h-8 w-8"
              src={friend.avatarSource}
              alt=""
            />
            <p>{friend.name}</p>
          </div>
        )}
      </div>

      {/* Friend Rating */}
      {friend && <StarRating rating={friend.rating} />}
    </div>
  )
}

export default Card
