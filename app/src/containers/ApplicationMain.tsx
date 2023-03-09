import ServerNavigator from '../components/ServerNavigator'
import { useParams } from 'react-router'
import { createContext, useEffect, useState } from 'react'
import IGlobalParameters from '../interfaces/IGlobalParameters'
import Unauthorised from './Unauthorised'
import { Route, Routes } from 'react-router'
import ChannelBrowser from './ChannelBrowser'
import useAuth from '../hooks/useAuth'

export const GlobalParametersContext = createContext<IGlobalParameters>({} as IGlobalParameters)

// TODO: Organise this file

const ApplicationMain = () => {
  
  const auth = useAuth()
  
  const channelId = useState('')
  const { serverId="" } = useParams()
  
  let globalParams:IGlobalParameters = {
    serverId: serverId,
    channelId: {get: channelId[0], set: channelId[1]}
  }

  useEffect(() => {
    globalParams.serverId = serverId
  }, [serverId])

  
  if (!auth.isLogin) { return <Unauthorised />}

  return (
    <GlobalParametersContext.Provider value={globalParams}>
      <div className='flex flex-row font-inter h-screen w-screen bg-primary-750'>
        <ServerNavigator />
        <div className='flex flex-row '>
          <Routes>
            <Route path='/:channelId' element={<ChannelBrowser />} />
          </Routes>
        </div>
      </div>
    </GlobalParametersContext.Provider>
  )
}

export default ApplicationMain