import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
const Auth: React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    const fullPath = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?fromUrl=${fullPath}`} replace />
  }
  return props.children
}

export default Auth
