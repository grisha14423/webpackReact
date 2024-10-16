import { useState } from "react"
import classes from './App.module.scss'
import { BugButton } from "../providers/ErrorBoundary"
import { Link, Outlet } from "react-router-dom"

const App = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }
  return (
    <div>
      <div>Hello World</div>
      <Link to={'/about'}>About</Link>
      <br/>
      <Link to={'/shop'}>shop</Link>
      <h3>{count}</h3>
      <button className={classes.button} onClick={handleIncrement}>increment</button>
      <BugButton />
      <Outlet/>
    </div>
  )
}

export default App
