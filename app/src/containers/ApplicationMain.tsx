import ServerNavigator from '../components/ServerNavigator'
import { useParams } from 'react-router'
import { createContext, useEffect, useState } from 'react'
import IGlobalParameters from '../interfaces/IGlobalParameters'
import Unauthorised from './Exceptions/Unauthorised'
import { Route, Routes } from 'react-router'
import ChannelBrowser from './ChannelBrowser'
import useAuth from '../hooks/useAuth'
import IChatMessage from '../interfaces/IChatMessage'
import useWebsocket from '../hooks/useWebsocket'
import Disconnected from './Exceptions/Disconnected'

export const GlobalParametersContext = createContext<IGlobalParameters>({} as IGlobalParameters)

// TODO: Organise this file
// FIXME: Do not let user pass if websocket not connected

const ApplicationMain = () => {
  
  const auth = useAuth()
  
  const channelId = useState('')
  const { serverId="" } = useParams()
  
  let globalParams:IGlobalParameters = {
    serverId: serverId,
    channelId: {get: channelId[0], set: channelId[1]},
    stompClient: undefined,
    auth: undefined
  }

  const stompClient = useWebsocket({
    onConnect: () => {
      console.log('Connected to websocket')
    },
    onDisconnect: () => {
      console.log('Disconnected from websocket')
    }
  })
  globalParams.stompClient = stompClient
  globalParams.auth = auth

  useEffect(() => {
    globalParams.serverId = serverId
  }, [serverId])

  
  if (!auth.isLogin) { return <Unauthorised />}

  if (!stompClient.active) {
    return <Disconnected />
  }

  return (
    <GlobalParametersContext.Provider value={globalParams}>
      <div className='flex flex-row font-inter h-screen w-grow bg-primary-750'>
        <ServerNavigator />
        <div className='flex flex-row grow'>
          <Routes>
            <Route path='/' element={<ChannelBrowser />} />
            <Route path='/:channelId' element={<ChannelBrowser />} />
          </Routes>
        </div>
      </div>
    </GlobalParametersContext.Provider>
  )
}

export default ApplicationMain