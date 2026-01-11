import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { store } from './redux/store.js'
import './index.css'

const suppress = (m) => {
  const s = String(m || '')
  return (
    s.includes('Firebase: Error') ||
    s.includes('auth/network-request-failed') ||
    s.includes('A listener indicated an asynchronous response') ||
    s.includes('Download the React DevTools')
  )
}

const origError = console.error
console.error = (...args) => {
  if (args.some(suppress)) return
  origError(...args)
}
const origWarn = console.warn
console.warn = (...args) => {
  if (args.some(suppress)) return
  origWarn(...args)
}
const origInfo = console.info
console.info = (...args) => {
  if (args.some(suppress)) return
  origInfo(...args)
}

window.addEventListener('error', (e) => {
  const m = e?.message || ''
  if (suppress(m)) {
    e.preventDefault()
  }
})
window.addEventListener('unhandledrejection', (e) => {
  const m = e?.reason?.message || e?.reason || ''
  if (suppress(m)) {
    e.preventDefault()
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
