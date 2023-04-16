import React, { useContext, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import NoChannelIdGradient from './NoChannelIdGradient'
import { GlobalParametersContext } from './ApplicationMain'
import { useMutation } from '@tanstack/react-query'

const AddFriendsContainer = () => {
  const [email, setEmail] = useState('')
  const globalParams = useContext(GlobalParametersContext)
  const addChannelMutation = useMutation({
    mutationFn: globalParams.HANDLER.API.createChannel,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
    
  })

  const onUserAdd = () => {
    addChannelMutation.mutate(encodeURIComponent(email))
  }


  return (
    <div className='relative grow flex justify-center items-center bg-inherit'>
      <NoChannelIdGradient className='absolute bg-inherit'/>
      <div className='animate-fade-in relative z-10 rounded-xl border-main border px-6 py-8 bg-primary-750'>
        <h2 className='text-center font-semibold mb-3 text-2xl'>Add a friend!</h2>
        <div className='flex justify-center items-center mb-4'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email or Usertag (Steve#9376)' className=' bg-inherit' />
          <HiUserAdd onClick={onUserAdd} className='text-xl cursor-pointer hover:scale-110 hover:text-main text-mainGray'/>
        </div>
        <p className='text-center text-red-600 absolute left-0 right-0 bottom-4'>This user does not exist!</p>
      </div>
    </div>
  )
}

export default AddFriendsContainer