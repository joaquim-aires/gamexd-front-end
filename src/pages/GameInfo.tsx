/* eslint-disable react/prop-types */

import {
  BiBook,
  BiLogoYoutube,
  BiPencil,
  BiSolidBook,
  BiSolidPencil,
  BiSolidStar,
  BiStar,
  BiHeart,
  BiSolidHeart,
} from 'react-icons/bi'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { formatNumber } from '../utils/numbers'
import StarRating from '../components/StarRating'
import Chip from '../components/Chip'
import Link from '../components/Link'
import { ScrollRestoration, useLoadergame, useParams } from 'react-router-dom'
import { dataGameInfo } from '../data/data'
import Avatar from '../components/Avatar'
import { useEffect, useState } from 'react'
import { Modal, Menu, Textarea, Button, Skeleton, Loader } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/AuthContext'

type teste = {
  banana: string
}

const GameInfo = () => {
  const { session } = useAuth()
  const { id } = useParams()

  const [openRating, setOpenRating] = useState(false)
  const [openEditRating, setOpenEditRating] = useState(false)

  const [game, setGame] = useState({})
  const [platforms, setPlatforms] = useState([])
  const [reviews, setReviews] = useState([])

  const [userReview, setUserReview] = useState({})

  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [totalStars, setTotalStars] = useState(5)
  const [averageRating, setAverageRating] = useState(null)
  const [totalRating, setTotalRating] = useState(0)

  const [errorMessage, setErrorMessage] = useState('')

  const [reviewBody, setReviewBody] = useState('')
  const [AlreadyReviewed, setAlreadyReviewed] = useState(false)

  const [favorite, setFavorite] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGame()
    fetchReviews()
    userAlreadyReviewed()
    checkFavorite()
  }, [])

  const fetchGame = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/games/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('Game', result)
      console.log(result.platforms)
      setGame(result)
      const activePlatforms = Object.entries(result.platforms)
        .filter(([key, value]) => value)
        .map(([key]) => key)

      setPlatforms(activePlatforms)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
    setLoading(false)
  }

  async function fetchReviews() {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${id}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('All Reviews', result)
      setReviews(result)
      if (result.length > 0) {
        const totalRatingResult = result.reduce((sum, review) => sum + review.star_rating, 0)
        setTotalRating(totalRatingResult)
        setAverageRating(totalRatingResult / result.length)
      } else {
        setAverageRating('Sem avaliações')
      }
      console.log('Average Rating:', averageRating)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  const handleReview = async () => {
    if (AlreadyReviewed == false) {
      try {
        const response = await fetch('http://localhost:3000/reviews/send-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            user_id: session.user.id,
            review_body: reviewBody,
            star_rating: rating,
          }),
        })

        if (!response.ok) {
          throw new Error('Falha ao avaliar')
        }

        fetchReviews()
        setReviewBody(userReview.review_body)
        setOpenRating(false)
        setAlreadyReviewed(true)
      } catch (error) {
        console.error('Error updating game:', error)
        setErrorMessage('Falha ao avaliar')
      }
    } else {
      updateReview()
    }
  }

  const updateReview = async () => {
    try {
      const response = await fetch('http://localhost:3000/reviews/update-review', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          user_id: session.user.id,
          review_body: reviewBody,
          star_rating: rating,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao avaliar')
      }

      setOpenEditRating(false)
      setAlreadyReviewed(true)
      setReviewBody(userReview.review_body)
      fetchReviews()
      userAlreadyReviewed()
      console.log('Usuario editou a avaliação')
    } catch (error) {
      console.error('Error updating game:', error)
      setErrorMessage('Falha ao avaliar')
    }
    console.log('userReview.review_body', userReview.review_body)
  }

  const handleChangeReviewInput = (event) => {
    console.log(event.target.value)
    setReviewBody(event.target.value)
  }

  async function userAlreadyReviewed() {
    try {
      const response = await fetch(`http://localhost:3000/reviews/check-user-review/${session.user.id}/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('User review', result[0])

      if (result.length > 0) {
        setRating(result[0].star_rating)
        setAlreadyReviewed(true)
        setUserReview(result[0])

        return true
      }
      console.log('User already reviewed ?', AlreadyReviewed)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  const handleUnfavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/delete-favorite/${id}/${session.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Network response was not ok')
      }

      const result = await response.json()
      console.log('Unfavorite', result)

      // Toggle the favorite state only if the request was successful
      setFavorite(!favorite)
    } catch (error) {
      console.error('Erro ao recuperar dados de favorito:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      const response = await fetch('http://localhost:3000/favorites/send-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          user_id: session.user.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao favoritar')
      }

      // Toggle the favorite state only if the request was successful
      setFavorite(!favorite)
    } catch (error) {
      console.error('Erro ao enviar favorito:', error)
    }
  }

  const checkFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/check-favorite/${session.user.id}/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      if (result.length > 0) {
        setFavorite(true)
      }
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  return (
    <div className="block w-full">
      <Header />
      <main className="flex gap-6 pt-20 pb-14 justify-center container mx-auto sm:px-6 xl:max-w-[1280px] ">
        <div className="flex flex-col gap-4 max-w-[16rem] md:w-[16rem]">
          {loading ? (
            <div className="w-[16rem] h-96 animate-pulse rounded-lg overflow-hidden shimmer "></div>
          ) : (
            <img
              src={game.header_image}
              className="max-w-[16rem] md:w-[16rem] max-h-[24rem] aspect-[16/24] w-full rounded-lg object-top object-cover"
              alt="Game Cover"
            />
          )}

          {loading ? (
            <div className=" w-[256px] h-[234px] rounded-lg shimmer"></div>
          ) : (
            <div className="bg-neutral-700 w-full rounded-lg px-4 py-6 flex flex-col gap-4">
              <ul className="flex gap-6 justify-center items-center py-2">
                <li className="flex gap-1 items-center">
                  <BiStar size={20} className="fill-miscelaneous-game" />
                  {formatNumber(totalRating)}
                  <p className="sr-only">Stars</p>
                </li>
                <li className="flex gap-1 items-center">
                  <BiPencil size={20} className="fill-miscelaneous-heart" />
                  {formatNumber(reviews.length)}
                  <p className="sr-only">Reviews</p>
                </li>
                {/* <li className="flex gap-1 items-center">
                <BiBook size={20} className="fill-miscelaneous-list" />
                {formatNumber(game.internal.stats.listed)}
                <p className="sr-only">Listed</p>
              </li> */}
              </ul>

              <div className="flex flex-col gap-3">
                <h3 className="w-full border-b py-1 border-b-neutral-50">Média</h3>

                <div>{reviews.length > 0 ? <StarRating rating={averageRating} /> : 'Sem avaliações'}</div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="w-full border-b py-1 border-b-neutral-50">Plataformas</h3>
                {/* Content */}
                <div className="flex flex-wrap gap-2">{platforms?.map((item) => <Chip key={item}>{item}</Chip>)}</div>
              </div>

              {/* gameItem - Trailers */}
              {/* <div className="flex flex-col gap-3"> */}
              {/* Title */}
              {/* <h3 className="w-full border-b py-1 border-b-neutral-50">Trailers</h3> */}
              {/* Content */}
              {/* <ul> */}
              {/* {game.external.trailers.map((item, index) => (
                  <li key={item}>
                    <Link href={item} LeadingIcon={BiLogoYoutube} target="_blank">
                      Official Trailer {index + 1}
                    </Link>
                  </li>
                ))} */}
              {/* </ul> */}
              {/* </div> */}

              {/* gameItem - Official Pages */}
              {/* <div className="flex flex-col gap-3"> */}
              {/* Title */}
              {/* <h3 className="w-full border-b py-1 border-b-neutral-50">Páginas Oficiais</h3> */}
              {/* Content */}
              {/* <div className="flex"> */}
              {/* {game.external.officialPages.map((item) => (
                  <Link className="truncate" key={item} href={item} target="_blank">
                    {item}
                  </Link>
                ))} */}
              {/* </div> */}
              {/* </div> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-6 justify-between">
            <section className="w-full flex flex-col gap-4">
              <div>
                {loading ? (
                  <div className="w-96 rounded-full shimmer h-4 mt-2"></div>
                ) : (
                  <h1 className="text-3xl">{game.name}</h1>
                )}
                {loading ? (
                  <div className="w-96 rounded-full shimmer h-4 mt-2"></div>
                ) : (
                  <h2>
                    {game.publishers} • {game.release_date}
                  </h2>
                )}
              </div>
              {loading ? (
                <div className="w-[800px] flex gap-2 flex-col mt-2">
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                  <div className=" w-full rounded-full shimmer h-3"></div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">{game.short_description}</div>
              )}
            </section>
            {loading ? (
              <div className="flex flex-col gap-6 p-4 rounded-lg items-center shimmer h-[208px] w-[164px]"></div>
            ) : (
              <ul className="flex h-fit flex-col gap-6 p-4 bg-neutral-700 rounded-lg items-center">
                <li>
                  <button
                    onClick={AlreadyReviewed ? () => setOpenEditRating(true) : () => setOpenRating(true)}
                    className="w-28 flex flex-col items-center p-1 gap-1 text-xs hover:bg-neutral-500/20 rounded-lg"
                  >
                    {AlreadyReviewed ? (
                      <BiSolidPencil size={48} className="fill-miscelaneous-game" />
                    ) : (
                      <BiSolidStar size={48} className="fill-miscelaneous-game" />
                    )}
                    <span>{AlreadyReviewed ? 'Reavaliar' : 'Avaliar'}</span>
                  </button>
                </li>

                {/* <li>
                <button className="w-28 flex flex-col items-center p-1 gap-1 text-xs hover:bg-neutral-500/20 rounded-lg">
                  <BiSolidBook size={48} className="fill-miscelaneous-list" />
                  <span>Adicionar a Lista</span>
                </button>
              </li> */}
                <li>
                  <button
                    className="w-28 flex flex-col items-center p-1 gap-1 text-xs hover:bg-neutral-500/20 rounded-lg "
                    onClick={favorite ? handleUnfavorite : handleFavorite}
                  >
                    {favorite ? (
                      <BiSolidHeart size={48} className="fill-miscelaneous-heart" />
                    ) : (
                      <BiHeart size={48} className="fill-miscelaneous-heart" />
                    )}

                    <span>{favorite ? 'Desfavoritar' : 'Favoritar'}</span>
                  </button>
                </li>
              </ul>
            )}

            <Modal
              opened={openRating}
              onClose={() => {
                setOpenRating(false)
              }}
              centered
              title="Avaliar"
            >
              <div className="flex gap-2 justify-center">
                <span>Como você avalia esse jogo?</span>
              </div>

              <div className="flex flex-row gap-5 justify-center pb-4">
                {[...Array(totalStars)].map((star, index) => {
                  const currentRating = index + 1

                  return (
                    <label key={index}>
                      <input
                        className="hidden"
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onChange={() => setRating(currentRating)}
                      />
                      <span
                        className="cursor-pointer text-3xl"
                        style={{
                          color: currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        &#9733;
                      </span>
                    </label>
                  )
                })}
              </div>
              <div className="px-12 ">
                <Textarea
                  onChange={handleChangeReviewInput}
                  placeholder="Escreva um comentário (opcional)"
                  autosize
                  minRows={4}
                ></Textarea>
                <button onClick={handleReview} className="p-3 bg-purple-500 rounded-md w-full mt-4 mb-4">
                  Avaliar
                </button>
              </div>
            </Modal>

            <Modal
              opened={openEditRating}
              onClose={() => {
                setOpenEditRating(false)
              }}
              centered
              title="Reavaliar"
            >
              <div className="flex gap-2 justify-center">
                <span>Edite sua avaliação do jogo</span>
              </div>

              <div className="flex flex-row gap-5 justify-center pb-4">
                {[...Array(totalStars)].map((star, index) => {
                  const currentRating = index + 1

                  return (
                    <label key={index}>
                      <input
                        className="hidden"
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onChange={() => setRating(currentRating)}
                      />
                      <span
                        className="cursor-pointer text-3xl"
                        style={{
                          color: currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        &#9733;
                      </span>
                    </label>
                  )
                })}
              </div>
              <div className="px-12 ">
                <Textarea
                  onChange={handleChangeReviewInput}
                  placeholder="Escreva um comentário (opcional)"
                  defaultValue={userReview.review_body}
                  autosize
                  minRows={4}
                ></Textarea>
                <button onClick={handleReview} className="p-3 bg-purple-500 rounded-md w-full mt-4 mb-4">
                  Reavaliar
                </button>
              </div>
            </Modal>
          </div>

          <div>
            <div className="w-full h-12 border-b py-1 border-b-neutral-50">
              <button className="text-xl">Análises</button>
            </div>

            <section className="flex flex-col gap-6">
              <div></div>

              {reviews.length === 0 && <p>Nenhuma análise disponível</p>}
              <ol className="flex flex-col gap-6">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <div className="flex gap-3 w-full">
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
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  )
}

export default GameInfo
