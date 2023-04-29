import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import ProjectSourceLogo from '../assets/projectsource.svg'
import IUser from '../interfaces/IUser'
import { GlobalParametersContext } from './ApplicationMain'
import NoChannelIdGradient from './NoChannelIdGradient'

//TODO add the ability to change the profile picture

const CreateUser = () => {
  const globalParams = useContext(GlobalParametersContext)
  const [keycloakProfile, setKeycloakProfile] = useState<any>({name: 'test'})
  const givenName = keycloakProfile?.given_name

  const userMutation = useMutation({
    mutationFn: globalParams.HANDLER.API.createUser,
    onSuccess: (data) => {
      console.log(data)
      window.location.reload()
    }
  }
  )

  const [username, setUsername] = useState<string>('')
  const [usertag, setUsertag] = useState<string>(Math.floor(1111+Math.random()*8888).toString())
  const [profilePicture, setProfilePicture] = useState<string>("")
  
  useEffect(() => {
    globalParams.auth?.profile.then((profile: any) => {
      setKeycloakProfile(profile)
    })
  }, [globalParams.auth])

  const usertagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    if (inputValue.length > 4) {
      inputValue = inputValue.substring(1, 5)
    }
    if(inputValue.length < 0) {
      inputValue = '0000'
    }
    while (inputValue.length < 4) {
      inputValue = '0' + inputValue
    }
    setUsertag(inputValue)

  }

  const onPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(event.target.value)
  }

  const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)

  const createUser = () => {
    debugger
    const user:IUser = {
      email: "",
      createdAt: new Date(),
      imagePath: profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${username}`,
      userKey: {
        username: username,
        tag: Number.parseInt(usertag)
      }      
    }

    userMutation.mutate(user)
  }

  return (
    <div className='font-inter flex flex-row h-screen w-screen bg-primary-750 text-main' >
      <div className='relative flex flex-col justify-center items-center w-full bg-inherit'>
        <NoChannelIdGradient className='absolute'/>
        <div className=' group flex items-center relative rounded-3xl border-2 border-main bg-inherit'>
          <div className='rounded-3xl absolute top-0 mx-auto left-0 right-0 -translate-y-1/2 w-40 border-2 border-main bg-inherit'>
            <img className='m-auto py-3 px-5 h-full w-full relative z-10' src={ProjectSourceLogo} alt="Project Source logo" />
            <div className='absolute bg-inherit  -left-0.5 -right-0.5 top-1/2 -bottom-[3px]'></div>
          </div>

          <div className='flex justify-center items-center h-full flex-col py-10 px-14'>
            <h1 className=' font-bold text-3xl mb-12 text-main'>Welcome {givenName}!</h1>
            <div className='flex flex-col items-center'>
              <h2 className='text-main'>Please enter a prefered username!</h2>
              <span className='flex justify-center  '>
                <input className='bg-inherit p-0.5 w-2/3' maxLength={12} value={username} onChange={usernameChange} placeholder={"Your username"} type="text" /> 
                #<input className='bg-inherit w-12 p-0.5 text-center' value={usertag} onChange={usertagChange} type="number"  />
              </span>
              
              <h2 className='text-main mt-4'>Choose an image!</h2>
              <input type="text" className='bg-inherit p-0.5 w-2/3 mb-2' placeholder='Enter the url to the image' value={profilePicture} onChange={onPictureChange} />
              <img src={profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${username}`} alt=""
              className='object-cover h-32 w-32 rounded-full border-main border-2' />
            </div>
          </div>

          <div className='border-l-2 h-full w-[200px] overflow-hidden rounded-r-3xl'>
            <img src="https://www.pixelstalk.net/wp-content/uploads/images6/Outer-Space-Desktop-Background.jpg" 
            className='object-left-bottom animate-[object-position-shift_30s_linear_infinite] h-full w-full object-cover' />
          </div>

          <button onClick={createUser} className='text-xl hover:text-primary-750 transition-colors duration-100 hover:bg-main rounded-xl border-2 border-main px-4 py-2 absolute borde bottom-0 mx-auto left-0 right-0 bg-inherit translate-y-1/2 w-fit text-main'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateUser