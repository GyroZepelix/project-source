import Sidebar from "../components/Sidebar/Sidebar"
import MessageSection from "../components/MessageSection"
import { useNavigate, useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import { GlobalParametersContext } from "./ApplicationMain"
import FriendSidebar from "../components/FriendSidebar/FriendSidebar"
import MessagingContainer from "./MessagingContainer"
import IChatMessage from "../interfaces/IChatMessage"
import useWebsocket from "../hooks/useWebsocket"
import NoChannelIdGradient from "./NoChannelIdGradient"



const ChannelBrowser = () => {

  const navigator = useNavigate()
  const { channelId="" } = useParams()
  const globalParams = useContext(GlobalParametersContext)

  useEffect(() => {
    globalParams.channelId.set(channelId)
  }, [channelId])

  return (
    <main className="text-main h-full flex grow">
      {
        globalParams.serverId === "@me" ?
        <>
          <FriendSidebar/>
          {channelId !== "" ? <MessagingContainer/> : <NoChannelIdGradient/>}
        </>
        :
        <>
          <Sidebar />
          <MessagingContainer/>
        </>
      }
    </main>
  )
}

export default ChannelBrowser