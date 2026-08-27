import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Daksha from './pages/Daksha.jsx'
import Team from './pages/Team.jsx'
import Competitions from './pages/Competitions.jsx'
import Workshops from './pages/Workshops.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daksha" element={<Daksha />} />
      <Route path="/team" element={<Team />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/workshops" element={<Workshops />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
