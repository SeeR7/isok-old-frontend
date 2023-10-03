import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRotes: React.FC = () => {
  const token = localStorage.getItem("accessToken")
  return (
    token ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default PrivateRotes