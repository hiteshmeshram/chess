import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Game } from './components/Game'

function App() {

  return (
    <div className='bg-slate-900 h-screen'>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/game' element={<Game/>} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
