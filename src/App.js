import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ActivityDetails from './pages/ActivityDetails'

function App () {
  return (
    <Routes>
      <Route path='*' element={<h1>404 Not Found</h1>} />
      <Route index path='/' element={<Homepage />} />
      <Route path='/activity/:id' element={<ActivityDetails />} />
    </Routes>
  )
}

export default App
