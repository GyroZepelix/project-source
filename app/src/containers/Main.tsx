import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ApplicationMain from "./ApplicationMain"
import Home from "./Home"
import WebsocketTest from "./WebsocketTest/WebsocketTest"

// TODO: Add 404 page
// TODO: add automatic redirect from /channels to /channels/@me etc.

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channels/:serverId/*" element={<ApplicationMain/>}/>
        <Route path="*" element={<div>404</div>} />
        <Route path="/websockettest" element={<WebsocketTest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main