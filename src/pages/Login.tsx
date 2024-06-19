import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../db/supabaseClient'
import { Loader } from '@mantine/core'
import { useAuth } from '../hooks/AuthContext'

const Login = () => {
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
    setLoading(true)
    const { email, password } = e
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.log('error', error)
      setErrorMessage(error.message)
      setLoading(false)
    } else {
      setLoading(false)
      navigate('/home')
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
                })}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
              <div className="flex justify-between">
                <a href="" className="text-white underline w-fit hover:text-neutral-300">
                  Esqueci minha senha
                </a>
                <Link to="/signup" className="text-white underline w-fit hover:text-neutral-300">
                  Criar conta
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

export default Login
