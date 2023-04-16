import Sidebar from "../components/Sidebar/Sidebar"
import { useNavigate, useParams } from "react-router"
import { FC, useContext, useEffect, useState } from "react"
import { GlobalParametersContext } from "./ApplicationMain"
import FriendSidebar from "../components/FriendSidebar/FriendSidebar"
import MessagingContainer from "./MessagingContainer"
import NoChannelIdGradient from "./NoChannelIdGradient"
import { isValidUUID } from "../services/UUID"
import AddFriendsContainer from "./AddFriendsContainer"



const ChannelBrowser = () => {

  const navigator = useNavigate()
  const { channelId="" } = useParams()
  const globalParams = useContext(GlobalParametersContext)
  globalParams.channelId = channelId
  const isChannelIdValid = isValidUUID(channelId)

  const containerToDisplay = () => {
    switch (channelId) {
      case "add":
        return <AddFriendsContainer />
      default:
        return isChannelIdValid ? <MessagingContainer /> : <NoChannelIdGradient />
    }
  }

  return (
    <main className="text-main h-full flex grow bg-inherit">
      {
        globalParams.serverId === "@me" ?
        <>
          <FriendSidebar/>
          { containerToDisplay() }
        </>
        :
        <>
          <Sidebar />
          { isChannelIdValid ? <MessagingContainer /> : <NoChannelIdGradient />}
        </>
      }
    </main>
  )
}

export default ChannelBrowser