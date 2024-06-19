import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link, ScrollRestoration, useLoaderData, useParams } from 'react-router-dom'
import { dataGameInfo } from '../data/data'
import StarRating from '../components/StarRating'
import Avatar from '../components/Avatar'
import { BiSolidChat } from 'react-icons/bi'

import { supabase } from '../db/supabaseClient'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Textarea } from '@mantine/core'
import { IoSend } from 'react-icons/io5'
import { useAuth } from '../hooks/AuthContext'

const ForumInfo = ({}) => {
  const { id } = useParams()
  useEffect(() => {
    handleForum()
    handleComments()
  }, [])

  const [forum, setForum] = useState([])
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState('')
  const [loading, setLoading] = useState(false)
  const { session } = useAuth()

  function formatDate(dateString) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  // const handleForum = async () => {
  //   setLoading(true)
  //   try {
  //     const { data, error } = await supabase
  //       .from('Foruns')
  //       .select(
  //         `*,
  //       profiles (*)

  //     `,
  //       )
  //       .eq('id', id)
  //       .single()

  //     if (error) {
  //       throw error
  //     }
  //     setForum(data)
  //     console.log('Foruns', data)
  //   } catch (error) {
  //     console.error('Erro ao buscar dados:', error)
  //   }
  //   setLoading(false)
  // }

  const handleForum = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/forums/forum/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('Foruns', result)
      setForum(result)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  // const handleComments = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('forum_has_comments')
  //       .select(
  //         `*,
  //       profiles (*)
  //     `,
  //       )
  //       .eq('forum_id', id)

  //     if (error) {
  //       throw error
  //     }
  //     setComments(data)
  //     console.log('Comments', data)
  //   } catch (error) {
  //     console.error('Erro ao buscar dados:', error)
  //   }
  // }

  const handleComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/forums/forum/${id}/comments`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()

      setComments(result)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  // const handleNewComment = async () => {
  //   try {
  //     const { data, error } = await supabase.from('forum_has_comments').insert({
  //       user_id: session.user.id,
  //       forum_id: id,
  //       comment: commentBody,
  //     })

  //     if (error) {
  //       throw error
  //     }
  //     handleComments()

  //     setCommentBody('')
  //   } catch (error) {
  //     console.error('Erro ao criar forum:', error)
  //   }
  // }

  const handleNewComment = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/forums/new-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user.id,
          forum_id: id,
          comment: commentBody,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      handleComments()
      setCommentBody('')
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  return (
    <div className="block w-full">
      <Header />
      <main className="flex flex-col gap-6 pt-20 pb-14 justify-center container mx-auto sm:px-6 xl:max-w-[1280px] ">
        <div>
          {loading ? (
            <div>
              <div className="w-full h-12 border-b py-1 border-b-neutral-50 flex flex-row justify-between">
                <div className="w-[40%] h-6 bg-neutral-700 rounded shimmer"></div>
              </div>
              <div className="flex flex-row border-white/30 border rounded-md mt-3 ">
                <div className="flex flex-col items-center gap-2 border-r border-white/30 p-4 min-w-32">
                  <div className="h-20 w-20  bg-neutral-700 rounded-full shimmer"></div>
                  <div className="min-w-20 h-3 bg-neutral-700 rounded shimmer"></div>
                </div>
                <div className="flex flex-col gap-4  bg-neutral-700 w-full p-4">
                  <div className="w-[20%] h-3 bg-neutral-700 rounded shimmer"></div>
                  <div className="w-[50%] h-5 bg-neutral-700 rounded shimmer"></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-12 border-b py-1 border-b-neutral-50 flex flex-row justify-between">
                <button className="text-2xl font-medium cursor-default">{forum.title}</button>
              </div>
              <div className="flex flex-row border-white/30 border rounded-md mt-3 ">
                <div className="flex flex-col items-center gap-2 border-r border-white/30 p-4 min-w-32">
                  <Avatar src={forum?.profiles?.avatar_url} className="cursor-pointer h-20 w-20"></Avatar>
                  <span className="cursor-pointer">{forum?.profiles?.username}</span>
                </div>
                <div className="flex flex-col gap-2  bg-neutral-700 w-full p-4">
                  <span className="text-xs">{formatDate(forum.created_at)}</span>
                  <div>{forum?.description}</div>
                </div>
              </div>
            </div>
          )}

          <section className="flex flex-col gap-3 ">
            <div></div>
            <h3 className="font-medium">Comentários</h3>

            {/* {forum.comments.map((item) => (
                <li className="border-b border-white/20 pb-3" key={item.id}>
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row gap-3 items-center">
                      <BiSolidChat size={48} />
                      <h3 className="text-xl font-semibold cursor-pointer">{item?.description}</h3>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col">
                        <p className="cursor-pointer">{item?.profiles?.username}</p>
                        <p className="text-xs">{formatDate(item?.created_at)}</p>
                      </div>

                      <Avatar src={item?.profiles?.avatar_url} className="cursor-pointer"></Avatar>
                    </div>
                  </div>
                </li>
              ))} */}
            {comments.length === 0 && <p>Nenhum comentário disponível</p>}
            <ul className="flex flex-col gap-3">
              {comments.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-row border-white/30 border rounded-md  p-4 gap-4">
                    <div className="flex flex-col items-center gap-2 ">
                      <Avatar src={item?.profiles?.avatar_url} className="cursor-pointer h-14 w-14"></Avatar>
                      <span className="cursor-pointer">{item?.profiles?.username}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs">{formatDate(forum.created_at)}</span>
                      <div>{item?.comment}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="flex flex-row w-full gap-2 mt-4">
            <Textarea
              placeholder="Escreva um comentário..."
              className="flex-grow"
              minRows={3}
              autosize
              value={commentBody}
              onChange={(event) => {
                setCommentBody(event.currentTarget.value)
              }}
            ></Textarea>
            <button className="bg-green-700 rounded-md p-4 h-[50%]" onClick={handleNewComment}>
              <IoSend />
            </button>
          </div>
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  )
}

export default ForumInfo
