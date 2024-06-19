import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link, ScrollRestoration, useLoaderData } from 'react-router-dom'
import { dataGameInfo } from '../data/data'
import StarRating from '../components/StarRating'
import Avatar from '../components/Avatar'
import { supabase } from '../db/supabaseClient'
import { useEffect, useState } from 'react'

const Search = ({ user }) => {
  const [recentGames, setRecentGames] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  async function searchGames(query: string) {
    try {
      const response = await fetch(`http://localhost:3000/games/search-game/${query}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('Games', result)
      setRecentGames(result)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  async function fetchRecentGames() {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/games/recent-games`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()

      console.log('Games', result)
      setRecentGames(result)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRecentGames()
  }, [])

  if (!recentGames) return <div>Loading the games...</div>

  return (
    <div className="block w-full">
      <Header user={user} />
      <main className="flex flex-col gap-6 pt-20 pb-14 justify-center container mx-auto sm:px-6 xl:max-w-[1280px] ">
        <div className="flex flex-row justify-center gap-4">
          <input
            className="flex bg-slate-900 p-1"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value)
            }}
          ></input>
          <button
            className="flex bg-slate-400 p-2 rounded-lg"
            onClick={() => {
              console.log(searchText)
              searchGames(searchText)
            }}
          >
            Pesquisar
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-2xl text-neutral-200 p-2 pl-0 border-b border-b-neutral-200 mr-8">Resultados</h1>
          <ul className="flex w-full hide-scroll gap-4 flex-wrap">
            {loading
              ? Array(10)
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
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Search
