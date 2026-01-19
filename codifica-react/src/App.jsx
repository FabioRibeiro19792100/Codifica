import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TimelinePublic from './pages/TimelinePublic'
import TeacherDashboard from './pages/TeacherDashboard'
import TeamDashboard from './pages/TeamDashboard'
import SchoolDashboard from './pages/SchoolDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<><Navigation /><TimelinePublic /></>} />
        <Route path="/teacher" element={<><Navigation /><TeacherDashboard /></>} />
        <Route path="/team" element={<><Navigation /><TeamDashboard /></>} />
        <Route path="/school" element={<><Navigation /><SchoolDashboard /></>} />
        <Route path="/admin" element={<><Navigation /><AdminDashboard /></>} />
      </Routes>
    </Router>
  )
}

export default App
