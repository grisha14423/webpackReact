import { useState } from "react"
import classes from "./App.module.scss"
import { BugButton } from "../providers/ErrorBoundary"
import { Link, Outlet } from "react-router-dom"
import jpegIcon from "@/assets/jpegIcon.jpeg"
import pngIcon from "@/assets/pngIcon.png"
import SvgIcon from "@/assets/svgIcon.svg"

const App = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  function todo(a: number) {
    return a
  }

  return (
    <div>
      <div>Hello World</div>
      <div>Platform: {__PLATFORM__}</div>
      <div>
        <img width={100} height={100} src={jpegIcon} alt="" />
        <img width={100} height={100} src={pngIcon} alt="" />
      </div>
      <div>
        <SvgIcon color={"red"} width={100} height={100} />
      </div>
      <Link to={"/about"}>About</Link>
      <br />
      <Link to={"/shop"}>shop</Link>
      <h3>{count}</h3>

      <button className={classes.button} onClick={handleIncrement}>
        increment
      </button>
      <BugButton />
      <Outlet />
    </div>
  )
}

export default App
