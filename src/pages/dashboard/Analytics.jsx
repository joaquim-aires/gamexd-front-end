import { useState, useEffect } from 'react'
import { supabase } from '../../db/supabaseClient'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Flex, TextInput } from '@mantine/core'
import { Table } from '@mantine/core'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import { useAuth } from '../../hooks/AuthContext'

const Analytics = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  const { session } = useAuth()
  const [foruns, setForuns] = useState([])
  const [reviews, setReviews] = useState([])
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchForuns()
    fetchReviews()
    fetchProfiles()
  }, [])

  const fetchForuns = async () => {
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

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reviews`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('All Reviews', result)
      setReviews(result)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`http://localhost:3000/profiles`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      console.log('All Reviews', result)
      setProfiles(result)
    } catch (error) {
      console.error('Erro ao recuperar dados:', error)
    }
  }

  return (
    <Dashboard>
      <div className="w-full grid grid-cols-3 gap-28 justify-center">
        <div className="bg-[#171524] py-2 pb-9 rounded-lg flex flex-col items-center gap-3">
          <span className="text-neutral-700 font-medium">Usuários cadastrados</span>
          <span className="text-6xl font-bold ">{profiles.length}</span>
        </div>
        <div className="bg-[#171524] py-2 pb-9 rounded-lg flex flex-col items-center gap-3">
          <span className="text-neutral-700 font-medium">Reviews</span>
          <span className="text-6xl font-bold ">{reviews.length}</span>
        </div>
        <div className="bg-[#171524] py-2 pb-9 rounded-lg flex flex-col items-center gap-3">
          <span className="text-neutral-700 font-medium">Fóruns</span>
          <span className="text-6xl font-bold ">{foruns.length}</span>
        </div>
      </div>
    </Dashboard>
  )
}

export default Analytics
