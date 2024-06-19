import { useState, useEffect } from 'react'
import { supabase } from '../../db/supabaseClient'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Flex, TextInput } from '@mantine/core'
import { Table } from '@mantine/core'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import { useAuth } from '../../hooks/AuthContext'

const Games = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  const { session } = useAuth()

  useEffect(() => {
    fetchGamesData()
    handleUser()
  }, [])

  const handleUser = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    setUser(data)
    console.log('USER', data)
  }

  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [gamesData, setGamesData] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [opened, { open, close }] = useDisclosure(false)

  const handleEditClick = (game) => {
    setSelectedGame(game)
    open()
    setValue('id', game.id)
    setValue('name', game.name)
    setValue('header_image', game.header_image)
    setValue('short_description', game.short_description)
    setValue('genres', game.genres)
    setValue('publishers', game.publishers)
    setValue('release_date', game.release_date)
    setSuccessMessage('')
    setErrorMessage('')
  }
  const handleDeleteGame = async (gameId) => {
    const confirmed = window.confirm('Are you sure you want to delete this game?')
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/games/delete-game/${gameId}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error('Failed to delete game')
        }
        fetchGamesData()
        console.log('Game deleted successfully')
      } catch (error) {
        console.error('Error deleting game:', error.message)
      }
    }
  }

  const handleUpdateGame = async (e) => {
    const { id, name, header_image, short_description, genres, publishers, release_date } = e
    try {
      const response = await fetch('http://localhost:3000/games/update-game', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: name,
          header_image: header_image,
          short_description: short_description,
          genres: genres,
          publishers: publishers,
          release_date: release_date,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to edit game')
      }

      setSuccessMessage('Game edited successfully!')
      fetchGamesData()
    } catch (error) {
      console.error('Error updating game:', error)
      setErrorMessage('Failed to edit game')
    }
  }

  const onSubmit = async (e) => {
    const { name, image_url } = e
    const { data, error } = await supabase.from('Games').insert({ name: name, image_url: image_url }).select()
    if (error) {
      console.log('ERROR', error)
      setErrorMessage(error.message)
      return
    } else {
      setSuccessMessage('Game added successfully!')
      reset()
      fetchGamesData()
      console.log('EVENT', e)
      console.log('DATA', data)
    }
  }

  async function fetchGamesData() {
    try {
      const { data, error } = await supabase.from('Games').select('*')
      if (error) {
        throw error
      }
      console.log(data)
      setGamesData(data)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error.message)
    }
  }

  return (
    <Dashboard>
      {/* <Modal title="Add Game" centered>
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}>
          <TextInput
            label="Name"
            placeholder="Name"
            mt="sm"
            {...register('name', {
              required: {
                value: true,
                message: 'Preencha o campo de nome',
              },
              validate: (value) => value.trim() !== '' || 'Campo obrigatório',
            })}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          <TextInput
            label="Image"
            placeholder="Image url"
            mt="sm"
            {...register('image_url', {
              required: {
                value: true,
                message: 'Preencha o campo de imagem',
              },
              validate: (value) => value.trim() !== '' || 'Campo obrigatório',
            })}
          />
          {errors.image_url && <p className="text-sm text-red-600">{errors.image_url.message}</p>}

          <Flex justify="center" align="center">
            <Button fullWidth type="submit" mt="sm" color="grape">
              Add Game
            </Button>
          </Flex>
          <Flex>
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </Flex>
        </form>
      </Modal> */}

      {/* <Flex justify="end" pb="md">
        <Button color="white" variant="outline">
          Add Game
        </Button>
      </Flex> */}

      <Table withTableBorder highlightOnHover className="text-white">
        <Table.Thead className="bg-neutral-950">
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th> </Table.Th>
            <Table.Th> </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {gamesData.map((game) => (
            <Table.Tr key={game.id}>
              <Table.Td>{game.name}</Table.Td>
              <Table.Td>
                <Button variant="outline" onClick={() => handleEditClick(game)}>
                  Edit
                </Button>
              </Table.Td>
              <Table.Td>
                <Button variant="outline" color="red" onClick={() => handleDeleteGame(game.id)}>
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {selectedGame && (
        <Modal opened={opened} onClose={close} title="Edit Game" centered>
          <form onSubmit={handleSubmit(handleUpdateGame)}>
            <TextInput
              label="ID"
              readOnly
              {...register('id', {
                required: {
                  value: true,
                  message: 'Preencha o campo de id',
                },
              })}
            />
            <TextInput
              label="Name"
              placeholder="Name"
              mt="sm"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Preencha o campo de nome',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            <TextInput
              label="Image"
              placeholder="Image url"
              mt="sm"
              {...register('header_image', {
                required: {
                  value: true,
                  message: 'Preencha o campo de imagem',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.header_image && <p className="text-sm text-red-600">{errors.header_image.message}</p>}

            <TextInput
              label="Description"
              placeholder="Short description"
              mt="sm"
              {...register('short_description', {
                required: {
                  value: true,
                  message: 'Preencha o campo de descrição',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.short_description && <p className="text-sm text-red-600">{errors.short_description.message}</p>}

            <TextInput
              label="Genres"
              placeholder="Genres"
              mt="sm"
              {...register('genres', {
                required: {
                  value: true,
                  message: 'Preencha o campo de gêneros',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.genres && <p className="text-sm text-red-600">{errors.genres.message}</p>}

            <TextInput
              label="Publishers"
              placeholder="Publishers"
              mt="sm"
              {...register('publishers', {
                required: {
                  value: true,
                  message: 'Preencha o campo de publishers',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.publishers && <p className="text-sm text-red-600">{errors.publishers.message}</p>}

            <TextInput
              label="Release Date"
              placeholder="Release Date"
              mt="sm"
              {...register('release_date', {
                required: {
                  value: true,
                  message: 'Preencha o campo de data de lançamento',
                },
                validate: (value) => value.trim() !== '' || 'Campo obrigatório',
              })}
            />
            {errors.release_date && <p className="text-sm text-red-600">{errors.release_date.message}</p>}

            <Flex justify="center" align="center">
              <Button color="blue" variant="outline" fullWidth type="submit" mt="sm">
                Edit Game
              </Button>
            </Flex>
            <Flex mt="sm">
              {errorMessage && <div className="text-red-600">{errorMessage}</div>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
            </Flex>
          </form>
        </Modal>
      )}
    </Dashboard>
  )
}

export default Games
