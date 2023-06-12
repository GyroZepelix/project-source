import { Routes, Route, Navigate } from "react-router"
import ApplicationMain from "./ApplicationMain"
import Home from "./Home"
import WebsocketTest from "./WebsocketTest/WebsocketTest"

// TODO: Add 404 page
// TODO: add automatic redirect from /channels to /channels/@me etc.

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/channels/@me"} replace/>} />
      <Route path="/channels/:serverId/*" element={<ApplicationMain/>}/>
      <Route path="*" element={<div>404</div>} />
      <Route path="/websockettest" element={<WebsocketTest />} />
    </Routes>
  )
}

export default Main