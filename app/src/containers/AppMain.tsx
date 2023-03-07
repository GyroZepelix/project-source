import ServerNavigator from '../components/ServerNavigator'
import MessageSection from '../components/MessageSection'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router'
import { createContext } from 'react'
import IGlobalParameters from '../interfaces/IGlobalParameters'
import useAuth from '../hooks/useAuth'
import Unauthorised from './Unauthorised'


const AppMain = () => {
  
  const auth = useAuth()

  const GlobalParametersContext = createContext<IGlobalParameters>({} as IGlobalParameters)

  const { serverId, channelId } = useParams()

  let globalParams:IGlobalParameters = {
    serverId: serverId ? serverId : '',
    channelId: channelId ? channelId : ''
  }

  if (!auth.isLogin) { return <Unauthorised />}

  return (
    <GlobalParametersContext.Provider value={globalParams}>
      <div className='flex flex-row font-inter h-screen w-screen bg-primary-750'>
        <ServerNavigator />
        <div className='flex flex-row '>
            <Sidebar />
            <MessageSection/>
          
        </div>

      </div>
    </GlobalParametersContext.Provider>
  )
}

export default AppMain