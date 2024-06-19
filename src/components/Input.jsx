/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'

const style = {
  input: cva('rounded-lg border border-neutral-400 px-3 py-2 focus:outline-none focus:border-primary-600'),
}

const Input = (props) => {
  return <input className={style.input} {...props} />
}

export default Input
