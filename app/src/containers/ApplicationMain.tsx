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
import { useQuery } from '@tanstack/react-query'
import { RestApiHandler } from '../services/RestApiHandler'
import { ApiV1 } from '../services/ApiV1'
import CheckIfUserExists from './Exceptions/CheckIfUserExists'
import IUser from '../interfaces/IUser'

export const GlobalParametersContext = createContext<IGlobalParameters>({} as IGlobalParameters)

// TODO: Organise this file

const ApplicationMain = () => {

  const channelId = useState('')
  const { serverId="" } = useParams()
  const auth = useAuth()
  const stompClient = useWebsocket({
    onConnect: () => {
      console.log('Connected to websocket')
    },
    onDisconnect: () => {
      console.log('Disconnected from websocket')
    }
  })
  
  
  let globalParams:IGlobalParameters = {
    serverId: serverId,
    channelId: {get: channelId[0], set: channelId[1]},
    stompClient: stompClient,
    auth: auth,
    HANDLER: {} as RestApiHandler,
  }

  

  useEffect(() => {
    globalParams.serverId = serverId
  }, [serverId])
  
  if (!auth.isLogin) { return <Unauthorised />}
  
  const HANDLER = new RestApiHandler(new ApiV1(import.meta.env.VITE_BACKEND_BASE_URL, auth))
  globalParams.HANDLER = HANDLER
  
  if (!stompClient.connected) {
    return <Disconnected />
  }

  return (
    
    <GlobalParametersContext.Provider value={globalParams}>
      <CheckIfUserExists redirect={<h1>no</h1>}>
        <div className='flex flex-row font-inter h-screen w-grow bg-primary-750'>
          <ServerNavigator />
          <div className='flex flex-row grow'>
            <Routes>
              <Route path='/' element={<ChannelBrowser />} />
              <Route path='/:channelId' element={<ChannelBrowser />} />
            </Routes>
          </div>
        </div>
      </CheckIfUserExists>
    </GlobalParametersContext.Provider>
  )
}

export default ApplicationMain