import Sidebar from "../components/Sidebar/Sidebar"
import { useNavigate, useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import { GlobalParametersContext } from "./ApplicationMain"
import FriendSidebar from "../components/FriendSidebar/FriendSidebar"
import MessagingContainer from "./MessagingContainer"
import NoChannelIdGradient from "./NoChannelIdGradient"
import { isValidUUID } from "../services/UUID"



const ChannelBrowser = () => {

  const navigator = useNavigate()
  const { channelId="" } = useParams()
  const globalParams = useContext(GlobalParametersContext)
  globalParams.channelId = channelId

  return (
    <main className="text-main h-full flex grow">
      {
        globalParams.serverId === "@me" ?
        <>
          <FriendSidebar/>
          {isValidUUID(channelId) ? <MessagingContainer/> : <NoChannelIdGradient/>}
        </>
        :
        <>
          <Sidebar />
          {isValidUUID(channelId) ? <MessagingContainer/> : <NoChannelIdGradient/>}
        </>
      }
    </main>
  )
}

export default ChannelBrowser