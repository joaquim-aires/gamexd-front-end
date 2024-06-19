/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'

const style = {
  wrapper: cva('', {
    variants: {
      example: {
        primary: '',
        secondary: '',
      },
    },
    defaultVariants: {
      example: 'primary',
    },
  }),
}

const ComponentTemplate = ({ example, ...props }) => {
  return (
    <div className={style.wrapper({ example })} {...props}>
      ComponentTemplate
    </div>
  )
}

export default ComponentTemplate
