/* eslint-disable react/prop-types */

import { HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

type props = {
  size?: 'sm' | 'md' | 'lg'
  src: string
} & HTMLProps<HTMLImageElement>

const Avatar = ({ src, alt, className, ...props }: props) => {
  return <img src={src} alt={alt} className={twMerge('w-10 h-10 rounded-full overflow-hidden', className)} {...props} />
}

export default Avatar
