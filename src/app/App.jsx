import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import MusicPlayer from '../components/MusicPlayer'

export default function App() {
  return (
    <>
      {/* 🎵 Global Music Player */}
      <MusicPlayer />

      {/* 🌐 Routes */}
      <RouterProvider router={router} />
    </>
  )
}