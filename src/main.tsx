// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import 'normalize.css/normalize.css'
import 'virtual:uno.css'
import '../src/index.css'
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>
)
