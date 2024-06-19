import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link, ScrollRestoration, useLoaderData } from 'react-router-dom'
import { dataGameInfo } from '../data/data'
import StarRating from '../components/StarRating'
import Avatar from '../components/Avatar'
import { BiSolidChat } from 'react-icons/bi'

import { supabase } from '../db/supabaseClient'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Input, Modal, Textarea } from '@mantine/core'
import { useAuth } from '../hooks/AuthContext'
import ForumLoader from '../components/ForumLoader'

const Forum = ({}) => {
  useEffect(() => {
    handleForum()
  }, [])

  const [foruns, setForuns] = useState([])

  const [openForum, setOpenForum] = useState(false)
  const [forumTitle, setforumTitle] = useState('')
  const [forumDescription, setforumDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const { session } = useAuth()

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  const handleForum = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/forums`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('Foruns', result)
      setForuns(result)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  // const handleForum = async () => {
  //   setLoading(true)
  //   try {
  //     const { data, error } = await supabase.from('Foruns').select(
  //       `*,
  //     profiles (*)
  //     `,
  //     )

  //     if (error) {
  //       throw error
  //     }
  //     setForuns(data)
  //     console.log('Foruns', data)
  //   } catch (error) {
  //     console.error('Erro ao buscar dados:', error)
  //   }
  //   setLoading(false)
  // }

  // const handleNewForum = async () => {
  //   try {
  //     const { data, error } = await supabase.from('Foruns').insert({
  //       user_id: session.user.id,
  //       title: forumTitle,
  //       description: forumDescription,
  //     })

  //     if (error) {
  //       throw error
  //     }
  //     setforumTitle('')
  //     setforumDescription('')
  //     setOpenForum(false)
  //     handleForum()
  //   } catch (error) {
  //     console.error('Erro ao criar forum:', error)
  //   }
  // }

  const handleNewForum = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/forums/new-forum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user.id,
          title: forumTitle,
          description: forumDescription,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()

      setforumTitle('')
      setforumDescription('')
      setOpenForum(false)
      handleForum()
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  return (
    <div className="block w-full">
      <Header />
      <main className="flex flex-col gap-6 pt-20 pb-14 justify-center container mx-auto sm:px-6 xl:max-w-[1280px] ">
        <div>
          <div className="w-full h-12 border-b py-1 border-b-neutral-50 flex flex-row justify-between">
            <span className="text-xl cursor-auto">Fóruns</span>
            <button
              className="text-sm hover:bg-neutral-700 transition-all duration-300 border p-2 rounded-md border-white/80"
              onClick={() => setOpenForum(true)}
            >
              Novo tópico
            </button>

            <Modal
              opened={openForum}
              onClose={() => {
                setOpenForum(false)
              }}
              centered
              title="Criar tópico"
            >
              <div className="px-12 flex flex-col gap-3">
                <Input placeholder="Título" onChange={(event) => setforumTitle(event.currentTarget.value)} />
                <Textarea
                  onChange={(event) => setforumDescription(event.currentTarget.value)}
                  placeholder="Descrição"
                  autosize
                  minRows={4}
                ></Textarea>
                <button onClick={handleNewForum} className="p-3 bg-purple-500 rounded-md w-full mt-4 mb-4">
                  Criar tópico
                </button>
              </div>
            </Modal>
          </div>

          <section className="flex flex-col gap-6">
            <div></div>
            {loading ? (
              <ForumLoader />
            ) : (
              <ul className="flex flex-col gap-6">
                {foruns.map((item) => (
                  <li className="border-b border-white/20 pb-3" key={item.id}>
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-row gap-3 items-center">
                        <BiSolidChat size={48} />
                        <Link to={`/forum/${item.id}`}>
                          <h3 className="text-xl font-semibold cursor-pointer">{item?.title}</h3>
                        </Link>
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
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  )
}

export default Forum
