import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/FakeAuthContext'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  useEffect(
    function () {
      if (!isAuthenticated) navigate('/')
    },
    [isAuthenticated, navigate]
  )
  return isAuthenticated ? children : null
}

export default ProtectedRoute
