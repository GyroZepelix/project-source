import Sidebar from "../components/Sidebar"
import MessageSection from "../components/MessageSection"
import { useNavigate, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { GlobalParametersContext } from "./ApplicationMain"

const ChannelBrowser = () => {

  const navigator = useNavigate()

  const { channelId="" } = useParams()
  const globalParams = useContext(GlobalParametersContext)

  useEffect(() => {
    globalParams.channelId.set(channelId)
  }, [channelId])

  return (
    <div className="text-main">
      <Sidebar />
      <MessageSection/>
      <h1>sID: {globalParams.serverId} | cID: {globalParams.channelId.get}</h1>
      <button onClick={() => {navigator("/channels/@me/1",)}}>test</button>
    </div>
  )
}

export default ChannelBrowser