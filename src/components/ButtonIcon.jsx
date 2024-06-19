/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'

const style = {
  button: cva('rounded-lg p-2 text-base inline-flex justify-center items-center transition-all', {
    variants: {
      intent: {
        primary: 'bg-primary-400 hover:bg-primary-600',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }),
}

const IconButton = ({ icon, onClick, ...props }) => {
  return (
    <button className={style.button()} onClick={onClick} {...props}>
      {icon}
    </button>
  )
}

export default IconButton
