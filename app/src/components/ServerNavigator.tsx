import { useLocation, useNavigate } from 'react-router'
import homeButton from '../assets/homeButton.svg'
import ServerButton from './ServerSelection/ServerButton'
import { GlobalParametersContext } from '../containers/ApplicationMain'
import { useContext, useEffect, useState } from 'react'
import IChatJointWithUser from '../interfaces/IChatJointWithUser'
import { StompSubscription } from '@stomp/stompjs'
import { emailFromToken } from '../services/JWT'

// TODO: Get rid of mock and implement real servers

const mockServers:any[] = [
  {name: "test1", serverId:"1", image: "https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg"}, 
  {name: "test2", serverId:"2", image: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"},
  {name: "test3", serverId:"3", image: "https://yt3.googleusercontent.com/_DiGCcjGwJQAZ3zmlyB8TCYuA8O9tDJ9zGNysq5sR0rxwYb6SP5fW8cb3LbfcRwfui0m27oIhA=s900-c-k-c0x00ffffff-no-rj"},
]

const dotOnHover = 'before:-translate-x-3.5 before:rounded-md before:top-0 before:my-auto before:bottom-0 hover:before:absolute hover:before:block before:w-2 before:h-10 before:bg-yellow-300'

// FIXME: When window is too small, the server buttons and the navigator get squished.

const appRoot = '/channels'

const ServerNavigator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const globalParams = useContext(GlobalParametersContext)
  const [chatsMap, setChatsMap] = useState<Map<string, IChatJointWithUser>>(globalParams.privateChatsById.get)
  const unreadMessages =  Array.from(chatsMap.values()).filter((chat) => chat.unreadMessages > 0)
  
  useEffect(() => {
    setChatsMap(globalParams.privateChatsById.get)
  }, [globalParams.privateChatsById.get])
  

  const selectedServer = location.pathname.split("/")[2]
  const dotOnHover = 'before:-translate-x-3.5 before:rounded-md before:top-0 before:transition-all before:h-3 before:my-auto before:bottom-0 hover:before:absolute hover:before:block before:w-2 hover:before:h-10 before:bg-main'

 
  

  const onClickHome = () => {
    navigate(`${appRoot}/@me`)
  }

  const onClickServer = (serverId: string) => {
    navigate(`${appRoot}/${serverId}`)
  }

  const onClickUnreadUser = (chatId: string) => {
    navigate(`${appRoot}/@me/${chatId}`)
  }

  return (
  <nav className=' bg-primary-0 h-full px-2.5 py-4 gap-2 flex flex-col items-center select-none'>
    <div className={`relative cursor-pointer ${selectedServer == "@me" && "before:block before:absolute "} ${dotOnHover} `} onClick={onClickHome}>
      <img className='h-[50px] select-none pointer-events-none ' src={homeButton} alt="Home Button" />
    </div>
    {
        unreadMessages.map((chat) => (
          <ServerButton key={chat.receiver.email} image={chat.receiver.imagePath} unreadMessages={chat.unreadMessages} name={chat.receiver.userKey.username} onClick={() => {onClickUnreadUser(chat.chat.chatId)}}/>
        ))
    }
    <div className='bg-primary-750 w-10 h-[3px] rounded' />
    {mockServers.map((server) => (
      <ServerButton key={server.serverId} selected={server.serverId == selectedServer} {...server} onClick={() => {onClickServer(server.serverId)}} />
    ))
    }
    </nav>
  )
}

export default ServerNavigator