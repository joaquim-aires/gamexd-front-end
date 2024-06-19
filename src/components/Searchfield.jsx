import { BiSearch } from 'react-icons/bi' // Example icon from react-icons

const SearchField = () => {
  return (
    <div className="flex items-center border border-neutral-400 rounded-lg px-3 py-2">
      <BiSearch />
      <input type="text" className="flex-grow pl-2" placeholder="Search..." />
    </div>
  )
}

export default SearchField
