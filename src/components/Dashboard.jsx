import { Link, useLocation } from 'react-router-dom'
import Header from './Header'

const Dashboard = ({ children }) => {
  const inactiveLink = 'flex py-2 px-16 w-full rounded-full justify-center hover:bg-neutral-700 transition-all'
  const activelink = inactiveLink + ' bg-neutral-800 text-white '

  let location = useLocation()

  return (
    <div>
      <Header />
      <div className="flex min-h-screen bg-[#171524] ">
        <aside className="flex flex-col gap-8 p-8   text-white transition-all w-fit ">
          <nav className="flex flex-col gap-2 font-bold justify-center">
            <Link
              to="/dashboard/analytics"
              className={location.pathname === '/dashboard/analytics' ? activelink : inactiveLink}
            >
              Analytics
            </Link>
            <Link
              to="/dashboard/games"
              className={location.pathname === '/dashboard/games' ? activelink : inactiveLink}
            >
              Games
            </Link>
          </nav>
        </aside>
        <div className="mb-2 mr-6 mt-6 rounded-md p-16 w-full bg-neutral-800">{children}</div>
      </div>
    </div>
  )
}

export default Dashboard
