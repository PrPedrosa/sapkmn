import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Store from './pages/Store';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/game' element={<Game/>}/>
      <Route path='/store' element={<Store/>}/>
    </Routes>
  )
}

export default App
