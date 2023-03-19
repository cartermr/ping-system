import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'

import LandingPage from './pages/LandingPage'

const App = () => {

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage />}
  ])

  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
