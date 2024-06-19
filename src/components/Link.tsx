/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'
import { HTMLProps } from 'react'
import { twMerge as tm } from 'tailwind-merge'

const style = {
  wrapper: cva('text-primary-300 hover:brightness-110 inline-flex items-center gap-1'),
}

type props = {
  LeadingIcon?: any
} & HTMLProps<HTMLAnchorElement>

const Link = ({ href, children, LeadingIcon, className, ...props }: props) => {
  return (
    <a className={tm(style.wrapper(), className)} href={href} {...props}>
      {LeadingIcon && <LeadingIcon size={24} />}
      <span>{children}</span>
    </a>
  )
}

export default Link
