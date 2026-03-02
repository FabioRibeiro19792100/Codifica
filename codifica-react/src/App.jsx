import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import TimelinePublic from './pages/TimelinePublic'
import TeacherDashboard from './pages/TeacherDashboard'
import TeamDashboard from './pages/TeamDashboard'
import SchoolDashboard from './pages/SchoolDashboard'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import './App.css'

function AppLayout({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<AppLayout><TimelinePublic /></AppLayout>} />

          {/* Professor */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['professor', 'admin']}>
              <AppLayout><TeacherDashboard /></AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/team" element={
            <ProtectedRoute allowedRoles={['professor', 'admin']}>
              <AppLayout><TeamDashboard /></AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/team/:teamId" element={
            <ProtectedRoute allowedRoles={['professor', 'admin']}>
              <AppLayout><TeamDashboard /></AppLayout>
            </ProtectedRoute>
          } />

          {/* Gestor */}
          <Route path="/school" element={
            <ProtectedRoute allowedRoles={['gestor', 'admin']}>
              <AppLayout><SchoolDashboard /></AppLayout>
            </ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout><AdminDashboard /></AppLayout>
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
