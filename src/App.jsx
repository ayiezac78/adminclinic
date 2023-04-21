import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <div>
        <Routes>
            {/* <Login/> */}
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
