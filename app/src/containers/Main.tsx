import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ApplicationMain from "./ApplicationMain"
import Home from "./Home"

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channels/:serverId/*" element={<ApplicationMain/>}/>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main