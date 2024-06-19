import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link, ScrollRestoration, useLoaderData } from 'react-router-dom'
import { dataGameInfo } from '../data/data'
import StarRating from '../components/StarRating'
import Avatar from '../components/Avatar'
import { useEffect, useState } from 'react'
import { supabase } from '../db/supabaseClient'
import { useAuth } from '../hooks/AuthContext'

const Profile = ({}) => {
  const { session } = useAuth()
  const [userFavorites, setUserFavorites] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingFavorites, setLoadingFavorites] = useState(false)
  useEffect(() => {
    handleUserReviews()
    handleFavorites()
    handleUser()
    console.log('session', session)
  }, [])

  const handleUser = async () => {
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    setUser(data)
    console.log('USER', data)
    setLoading(false)
  }

  const handleUserReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/user-reviews/${session.user.id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setUserReviews(result)
      console.log('user review', result)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  const handleFavorites = async () => {
    setLoadingFavorites(true)
    try {
      const response = await fetch(`http://localhost:3000/favorites/${session.user.id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setUserFavorites(result)
      console.log('User favorites', result)
    } catch (error) {
      console.error('Erro ao obter dados:', error)
    }
    setLoadingFavorites(false)
  }

  return (
    <div className="block w-full">
      <Header />
      <main className="flex flex-col gap-6 pt-20 pb-14 justify-center container mx-auto sm:px-6 xl:max-w-[1280px] ">
        {loading ? (
          <div className="flex gap-6">
          <div className="flex">
          <div className="h-24 w-24  bg-neutral-700 rounded-full shimmer"></div>
          </div>
          <div className="flex flex-col flex-auto justify-top gap-4">
            <div className="flex flex-row gap-1 items-center">
            <div className="min-w-20 h-5 bg-neutral-700 rounded shimmer"></div>
            </div>

            <div className="flex flex-row gap-6 items-center">
            <div className="min-w-20 h-5 bg-neutral-700 rounded shimmer"></div>
            <div className="w-[12%] h-5 bg-neutral-700 rounded shimmer"></div>
            </div>
          </div>
        </div>
        ) : (
           <div className="flex gap-6">
          <div className="flex">
            <Avatar className="flex w-24 h-24" src={user.avatar_url}></Avatar>
          </div>
          <div className="flex flex-col flex-auto justify-top gap-2">
            <div className="flex flex-row gap-1 items-center">
              <p>{user.username}</p>
            </div>

            <div className="flex flex-row gap-6 items-center">
              <p>{userReviews.length} Análises</p>
              <p>{userFavorites.length} Jogos favoritos</p>
            </div>
          </div>
        </div>
        )}
        

        {/* Category List */}
        <div className="flex flex-col gap-5 w-full">
          {/* Title */}
          <h1 className="text-2xl text-neutral-200 p-2 pl-0 border-b border-b-neutral-200 mr-8">Jogos Favoritos</h1>
          {/* List */}
          <ul className="flex w-full hide-scroll gap-4 overflow-x-scroll">
            
            {loadingFavorites
              ? Array(9)
                  .fill()
                  .map((_, index) => (
                    <li key={index}>
                      <div className="border shadow rounded-md p-2 w-48 h-48  shimmer"></div>
                    </li>
                  ))
              : userFavorites.length === 0 ? (
                <li>Não existem jogos</li>
              ) : userFavorites.map((item) => (
                  <li key={item.name}>
                    <Link to={`/game-info/${item.game_id}`}>
                      <Card title={item.Games.name} src={item.Games.header_image} />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>

        {/* User Reviews */}
        <div>
          {/* Tab List 🔶 */}
          <div className="w-full h-12 border-b py-1 border-b-neutral-50">
            {/* Tab Item 🔶 */}
            <button className="text-xl">Análises</button>
          </div>
          {/* Reviews Section */}
          <section className="flex flex-col gap-6">
            {/* Filters 🔶 */}
            <div></div>
            {/* Review List */}
            {userReviews.length === 0 && <p>Nenhuma análise disponível</p>}
            <ol className="flex flex-col gap-6">
              {userReviews.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-row justify-between w-full ">
                    <div className="flex gap-3">
                      <Avatar src={item.profiles.avatar_url}></Avatar>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-row gap-1 items-center">
                            <p>{item.profiles.username}</p>

                            <p className="text-sm text-neutral-500">{item.username}</p>
                          </div>

                          <StarRating rating={item.star_rating}></StarRating>
                        </div>

                        <p>{item.review_body}</p>
                      </div>
                    </div>
                    <Link to={`/game-info/${item.game_id}`}>
                      <Card title={item.Games.name} src={item.Games.header_image} />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  )
}

export default Profile
