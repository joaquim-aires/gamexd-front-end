/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { FaRegChartBar, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../db/supabaseClient'
import { Menu, Button, Text, rem } from '@mantine/core'
import { IoIosLogOut } from 'react-icons/io'
import { IoBarChart } from 'react-icons/io5'
import { useAuth } from '../hooks/AuthContext'

const Header = ({}) => {
  const { user } = useAuth()
  const { signOut } = useAuth()
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    handleUser()
  }, [])

  const handleUser = async () => {
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    setProfile(data)
    setLoading(false)
    console.log('Profile', data)
  }

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <header className="flex flex-col relative">
      <div className="h-2 bg-neutral-50 w-full"></div>
      <img src="/src/assets/box-art.svg" className="absolute left-0" />
      <Link to={`/home`}>
        <img src="/src/assets/logo.svg" className="absolute left-3 top-1/2 -translate-y-1/2" />
      </Link>
      <div className="flex w-full justify-end items-center p-4 bg-primary-600 gap-4">
        <Link to={`/search`}>
          <span className=" py-1 text-neutral-50">Pesquisa</span>
        </Link>
        <Link to={`/forum`}>
          <span className="py-1 text-neutral-50">Fórum</span>
        </Link>
        {/* <span className="px-4 py-1 text-neutral-50" href="#">
          Minhas Listas
        </span> */}

        <Menu shadow="md" width={200} color="red">
          <Menu.Target>
            <div>
              <div className="flex items-center gap-2 hover:cursor-pointer  ">
                {loading ? (
                  <div className="flex items-center gap-2 ">
                    <div className="h-10 w-10  shimmer rounded-full"></div>

                    <div className="min-w-16 h-5 shimmer rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ">
                    <div className="h-10 w-10 ">
                      <img className="rounded-full" src={profile.avatar_url} />
                    </div>
                    <span>{profile.username}</span>
                  </div>
                )}
              </div>
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Link to={'/profile'}>
              <Menu.Item leftSection={<FaUser />}>Meu Perfil</Menu.Item>
            </Link>

            <Menu.Divider />
            {profile.role === 'admin' && (
              <>
                <Link to="/dashboard/analytics" className="text-md">
                  <Menu.Item leftSection={<IoBarChart />}>Dashboard</Menu.Item>
                </Link>

                <Menu.Divider />
              </>
            )}

            <Menu.Item color="red" onClick={handleLogout} leftSection={<IoIosLogOut size={17} />}>
              Sair
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  )
}

export default Header
