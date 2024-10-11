import { useState } from "react"
import './App.scss'
import { BugButton } from "../providers/ErrorBoundary"

const App = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }
  return (
    <div>
      <div>Hello World</div>
      <h3>{count}</h3>
      <button onClick={handleIncrement}>increment</button>
      <BugButton />
    </div>
  )
}

export default App
