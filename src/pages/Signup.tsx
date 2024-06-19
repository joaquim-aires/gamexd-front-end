import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { supabase } from '../db/supabaseClient'
import { useAuth } from '../hooks/AuthContext'
import { Loader } from '@mantine/core'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  let navigate = useNavigate()
  const { session } = useAuth()

  useEffect(() => {
    if (session) {
      navigate('/home')
    }
  }, [])

  const onSubmit = async (e) => {
    const { email, username, password } = e
    try {
      setLoading(true)
      const { data, error } = await supabase.from('profiles').select('username').eq('username', username)
      if (error) {
        console.error('Error checking username availability:', error)
        setErrorMessage('An error occurred while checking username availability.')
        setLoading(false)
        return
      }

      if (data.length > 0) {
        setErrorMessage('Esse nome de usuário não está disponível, tente outro.')
        setLoading(false)
        return
      }
    } catch (error) {
      console.error('Error checking username availability:', error)
      setErrorMessage('An error occurred while checking username availability.')
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    if (error) {
      console.log(error)
      setErrorMessage(error.message)
      setLoading(false)
    } else {
      const { error } = await supabase
        .from('profiles')
        .update([
          { username: username, avatar_url: 'https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg' },
        ])
        .eq('id', data.user.id)

      if (error) {
        console.error('Error updating profile:', error.message)
        setLoading(false)
        return
      } else {
        console.log('Profile updated successfully')
        setLoading(false)
        navigate('/home')
      }

      console.log('EVENT', e)
      console.log('DATA', data)
    }
  }

  return (
    <div className="w-full h-screen bg-[#373545] flex flex-row mx-auto">
      <div className="w-2/3 overflow-hidden flex items-center">
        <img className="w-full center" src="/src/assets/images/Image.svg" alt="" />
      </div>
      <div className="flex justify-center items-center flex-col w-1/3">
        <img src="/src/assets/images/Frame_74.svg" alt="" />
        <div className="w-96">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-white" htmlFor="email">
                E-mail
              </label>
              <input
                className="border border-[#171524] rounded-md p-2 outline-none bg-neutral-200 text-black"
                placeholder="E-mail"
                type="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'O campo de e-mail deve ser preenchido',
                  },
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                    message: 'E-mail inválido',
                  },
                })}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="username">
                Username
              </label>
              <input
                className="border border-[#171524] rounded-md p-2 outline-none bg-neutral-200 text-black"
                placeholder="Username"
                type="text"
                {...register('username', {
                  required: {
                    value: true,
                    message: 'O campo de username deve ser preenchido',
                  },
                  minLength: {
                    value: 4,
                    message: 'O username deve ter no mínimo 4 caracteres',
                  },
                  maxLength: {
                    value: 15,
                    message: 'O username deve ter no máximo 15 caracteres',
                  },
                  validate: (value) => value.trim() !== '' || 'O nome de usuário não pode ter espaços',
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: 'O nome de usuário só pode conter letras, números, traços e sublinhados',
                  },
                })}
              />
              {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="senha">
                Senha
              </label>
              <input
                className="border border-[#171524] rounded-md p-2 outline-none bg-neutral-200 text-black"
                placeholder="Senha"
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Preencha o campo de senha',
                  },
                  minLength: {
                    value: 6,
                    message: 'A senha precisa ter no mínimo 6 dígitos',
                  },
                })}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
              <div className="flex justify-between">
                <a href="" className="text-white underline w-fit hover:text-neutral-300">
                  Esqueci minha senha
                </a>
                <Link to="/" className="text-white underline w-fit hover:text-neutral-300">
                  Login
                </Link>
              </div>
            </div>

            {loading ? (
              <button
                className="bg-violet-400 p-2 rounded-md text-white flex items-center justify-center"
                type="submit"
              >
                <Loader size={24} color="white" />
              </button>
            ) : (
              <button className="bg-violet-400 p-2 rounded-md text-white" type="submit">
                Entrar
              </button>
            )}
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
