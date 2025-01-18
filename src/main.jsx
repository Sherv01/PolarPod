import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NewsInterface from './NewsInterface.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <NewsInterface />
  </StrictMode>,
)
