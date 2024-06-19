import { useState } from 'react'
import { BiSolidChat } from 'react-icons/bi'

const ForumLoader = () => {
  const [items, setItems] = useState(new Array(7).fill(null))
  return (
    <ul className="w-full h-[571px] flex flex-col gap-6">
      {items.map((item, index) => (
        <li key={index} className="border-b border-white/20 pb-3">
          <div className="flex flex-row justify-between w-full">
            <div className="flex gap-3 items-center">
              <BiSolidChat size={48} />
              <div className="min-w-60 h-6 bg-neutral-700 rounded-full shimmer"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <div className="min-w-20 h-5 bg-neutral-700 rounded shimmer"></div>
                <div className="min-w-20 h-3 bg-neutral-700 rounded shimmer"></div>
              </div>
              <div className="h-10 w-10  bg-neutral-700 rounded-full shimmer"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ForumLoader
