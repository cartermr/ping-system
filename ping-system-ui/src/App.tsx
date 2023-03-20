import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import LogIn from './pages/LogIn'

import LandingPage from './pages/LandingPage'

const App = () => {

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LogIn /> }
  ])

  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
