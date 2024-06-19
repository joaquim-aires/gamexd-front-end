/* eslint-disable react/prop-types */

import { cva } from 'class-variance-authority'

const style = {
  chip: cva('rounded-full px-2 py-1 text-sm border border-neutral-50 text-neutral-50 inline-flex items-center'),
}

const Chip = ({ children }) => {
  return <p className={style.chip()}>{children}</p>
}

export default Chip
