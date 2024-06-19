/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'

const style = {
  button: cva('rounded-lg px-4 py-1 text-base inline-flex justify-center items-center transition-all', {
    variants: {
      intent: {
        primary: 'bg-primary-400 hover:bg-primary-600',
        secondary: 'bg-none border border-primary-400 text-primary-400 hover:bg-primary-600/20',
        tertiary: 'bg-none border-none hover:bg-neutral-50/10',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }),
}

const Button = ({ children, intent, ...props }) => {
  return (
    <button className={style.button({ intent })} {...props}>
      {children}
    </button>
  )
}

export default Button
