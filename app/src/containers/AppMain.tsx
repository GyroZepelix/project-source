import React from 'react'
import ServerNavigator from '../components/ServerNavigator'
import MessageSection from '../components/MessageSection'
import Sidebar from '../components/Sidebar'

const AppMain = () => {
  return (
    <div className='flex flex-row font-inter h-screen w-screen bg-primary-750'>
      <ServerNavigator />
      <div className='flex flex-row '>
        <Sidebar />
        <MessageSection/>
      </div>

    </div>
  )
}

export default AppMain