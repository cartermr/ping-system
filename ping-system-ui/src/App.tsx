import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import LogIn from './pages/LogIn'

import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Container from '@mui/material/Container'
import { CssBaseline } from '@mui/material'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { path: 'login', element: <LogIn /> },
        { path: '', element: <LandingPage /> },
        { path: 'signup', element: <SignUp /> }
      ]
    },
  ])

  return (
    <Container>
      <CssBaseline />
      <RouterProvider router={router} />
    </Container>
  )
}

export default App
