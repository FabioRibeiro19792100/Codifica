import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { user, getDefaultRoute } = useAuth()

  if (user) {
    return <Navigate to={getDefaultRoute()} replace />
  }

  return <Navigate to="/login" replace />
}

export default Home
