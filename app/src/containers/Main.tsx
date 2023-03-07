import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AppMain from "./AppMain"
import Home from "./Home"

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channels/:serverId" element={<AppMain />}/>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main