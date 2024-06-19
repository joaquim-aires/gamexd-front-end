import SignUp from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search'
import GameInfo from './pages/GameInfo'
import Header from './components/Header'
import Games from './pages/dashboard/Games'
import Forum from './pages/Forum'
import ForumInfo from './pages/ForumInfo'
import { supabase } from './db/supabaseClient'
import { AuthProvider, useAuth } from './hooks/AuthContext'
import { dataGameInfo, dataHome } from './data/data'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'

import Analytics from './pages/dashboard/Analytics'

export async function loaderFunction({ params }) {
  const data = dataGameInfo[params.gameId]
  return data
}

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home data={dataHome} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile data={dataHome} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum data={dataHome} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search data={dataHome} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/games"
            element={
              <ProtectedRouteAdmin>
                <Games />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/dashboard/analytics"
            element={
              <ProtectedRouteAdmin>
                <Analytics />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/game-info/:id"
            element={
              <ProtectedRoute>
                <GameInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/:id"
            element={
              <ProtectedRoute>
                <ForumInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
