import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './routes/Home/Home'

import Initial from './routes/Initial/Initial'
import Cadastro from './routes/cadastro/cadastro'

import './App.scss'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ini" element={<Initial />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </HashRouter>
  )
}

export default App
