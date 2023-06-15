import { Client } from '@stomp/stompjs'
import React, { useEffect, useState } from 'react'

interface IProps {
  onConnect: () => void
  onDisconnect: () => void
}


const useWebsocket = (props:IProps) => {
  const [stompClient, setStompClient] = useState<Client>(new Client({
    brokerURL: `wss://${import.meta.env.VITE_BACKEND_BASE_URL?.split('//')[1]}/chat`,
    onConnect: props.onConnect,
    onDisconnect: props.onDisconnect
  }))

  useEffect(() => {
    stompClient.activate()
    return () => {
      stompClient.deactivate()
    }
  }, [])

  return stompClient
}

export default useWebsocket