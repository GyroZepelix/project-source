import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AppMain from "./AppMain"
import Home from "./Home"

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppMain />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Main