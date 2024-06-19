/* eslint-disable react/prop-types */
import { Link, ScrollRestoration } from 'react-router-dom'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'

const Home = ({ data }) => {
  const [recentGames, setRecentGames] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRecentGames()
  }, [])

  const fetchRecentGames = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/games/recent-games`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('Games', result)
      setRecentGames(result)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  return (
    <div className="w-full">
      <Header />
      <main className="flex py-14 pl-8 items-center flex-col gap-8 w-full pr-4">
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-2xl text-neutral-200 p-2 pl-0 border-b border-b-neutral-200 mr-8">
            Recentemente Adicionados
          </h1>
          <ul className="flex w-full hide-scroll gap-4 overflow-x-scroll">
            {loading
              ? Array(9)
                  .fill()
                  .map((_, index) => (
                    <li key={index}>
                      <div className="border shadow rounded-md p-2 w-48 h-48  shimmer"></div>
                    </li>
                  ))
              : recentGames.map((item) => (
                  <li key={item.name}>
                    <Link to={`/game-info/${item.id}`}>
                      <Card title={item.name} src={item.header_image} />
                    </Link>
                  </li>
                ))}
          </ul>

          {data.friends.length !== 0 && (
            <>
              {/* Title */}
              <h1 className="text-2xl text-neutral-200 p-2 pl-0 border-b border-b-neutral-200 mr-16">Por Amigos</h1>
              {/* List */}
              <ul className="flex w-full hide-scroll gap-4 overflow-x-scroll">
                {data.friends.map((item, index) => (
                  <li key={index}>
                    <Link to={`game-info/${item.title}`}>
                      <Card title={item.title} src={item.imageSource} friend={item.friend} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Title */}
          <h1 className="text-2xl text-neutral-200 p-2 pl-0 border-b border-b-neutral-200 mr-8">Destaques da Semana</h1>
          {/* List */}
          <ul className="flex w-full hide-scroll gap-4 overflow-x-scroll">
            {data.weekly.map((item, index) => (
              <li key={index}>
                <Link to={`game-info/${item.title}`}>
                  <Card title={item.title} src={item.imageSource} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  )
}

export default Home
