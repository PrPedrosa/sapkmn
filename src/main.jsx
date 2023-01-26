import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { GameProviderWrapper } from './contexts/game.context'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameProviderWrapper>
      <Router>
        <App />
      </Router>
    </GameProviderWrapper>
)
