import { StompSubscription } from '@stomp/stompjs'
import React, { FC, useContext, useEffect, useState } from 'react'
import { emailFromToken } from '../services/JWT'
import { GlobalParametersContext } from './ApplicationMain'
import IChatJointWithUser from '../interfaces/IChatJointWithUser'
import { useNavigate } from 'react-router'

interface IProps {
  children: React.ReactNode
}

const FetchPrivateMessageUsers:FC<IProps> = ({children}) => {
  const [privateChats, setPrivateChats] = useState<IChatJointWithUser[]>([])
  const globalParams = useContext(GlobalParametersContext)
  const navigate = useNavigate()

  const websocketHeaders = {Authorization: `Bearer ${globalParams.auth?.token}`}
  useEffect(() => {
    let subscription: StompSubscription | undefined = undefined
    const clientConnected = globalParams.stompClient != undefined && globalParams.stompClient.active;
    if (clientConnected) {
      const myEmail = emailFromToken(globalParams.auth?.token)
      subscription = globalParams.stompClient?.subscribe(`/channel/chats/${myEmail}`, (channels) => {
        const fetchedChats = JSON.parse(channels.body)
        if (Array.isArray(fetchedChats)) {
          setPrivateChats(fetchedChats)
        }
      })
      globalParams.stompClient?.publish({destination: `/app/chats/${myEmail}`, headers: websocketHeaders})
    }
    

    return () => {
      if (subscription != undefined) {
        subscription.unsubscribe();
        setPrivateChats([])
      }
    }
  }, [globalParams.stompClient])
  
  useEffect(() => {
    const privateChatMap = new Map<string, IChatJointWithUser>()
    privateChats.forEach((chat) => {
      privateChatMap.set(chat.chat.chatId, chat)
    })
    globalParams.privateChatsById.set(privateChatMap)
  }, [privateChats])

  return (
  <>
    {children}
  </>  
  )
}

export default FetchPrivateMessageUsers