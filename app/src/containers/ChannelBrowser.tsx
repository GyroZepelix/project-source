import Sidebar from "../components/Sidebar/Sidebar"
import MessageSection from "../components/MessageSection"
import { useNavigate, useParams } from "react-router"
import { useContext, useEffect } from "react"
import { GlobalParametersContext } from "./ApplicationMain"
import FriendSidebar from "../components/FriendSidebar/FriendSidebar"

const ChannelBrowser = () => {

  const navigator = useNavigate()

  const { channelId="" } = useParams()
  const globalParams = useContext(GlobalParametersContext)

  useEffect(() => {
    globalParams.channelId.set(channelId)
  }, [channelId])

  return (
    <main className="text-main h-full flex">
      {
        globalParams.serverId === "@me" ?
        <>
          <FriendSidebar/>
        </>
        :
        <>
          <Sidebar />
          <MessageSection/>
        </>
      }
    </main>
  )
}

export default ChannelBrowser