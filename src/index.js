import React from 'react'
import ReactDOM from 'react-dom'
import App  from './App'
 
const root = ReactDOM.createRoot(document.getElementById('root'));


async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
  return worker.start()
}


enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})