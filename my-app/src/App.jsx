import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="title">
        {count}
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
      </div>
    </>
  )
}

export default App
