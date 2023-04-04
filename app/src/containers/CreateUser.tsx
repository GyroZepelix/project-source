import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import ProjectSourceLogo from '../assets/projectsource.svg'
import IUser from '../interfaces/IUser'
import { GlobalParametersContext } from './ApplicationMain'

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
  const [usertag, setUsertag] = useState<string>(Math.floor(Math.random()*9999).toString())
  const [profilePicture, setProfilePicture] = useState<string>('https://cdnb.artstation.com/p/assets/images/images/004/456/215/large/wil-hughes-troll-face.jpg?1483926054')
  
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

  const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)

  const createUser = () => {
    const user:IUser = {
      email: "",
      createdAt: new Date(),
      imagePath: profilePicture,
      userKey: {
        username: username,
        tag: Number.parseInt(usertag)
      }      
    }

    userMutation.mutate(user)
  }

  return (
    <div className='font-inter flex flex-row h-screen w-screen bg-primary-750 text-main' >
      <div className='flex flex-col justify-center items-center w-full bg-inherit'>
        <div className=' group flex items-center relative rounded-3xl border-2 border-main bg-inherit'>
          <div className='absolute top-0 mx-auto left-0 right-0 bg-inherit -translate-y-1/2 w-36'>
            <img className='m-auto p-3 h-full w-full' src={ProjectSourceLogo} alt="Project Source logo" />
          </div>

          <div className='flex justify-center items-center h-full flex-col py-10 px-14'>
            <h1 className=' font-bold text-3xl mb-12 text-main'>Welcome {givenName}!</h1>
            <div className='flex flex-col items-center'>
              <h2 className='text-main'>Please enter a prefered username!</h2>
              <span className='flex justify-center  '>
                <input className='bg-inherit p-0.5 w-2/3' maxLength={12} value={username} onChange={usernameChange} placeholder={"Your username"} type="text" /> 
                #<input className='bg-inherit w-12 p-0.5 text-center' value={usertag} onChange={usertagChange} type="number"  />
              </span>
              <h2 className='text-main mt-4 mb-2'>Choose an image!</h2>
              <img src="https://cdnb.artstation.com/p/assets/images/images/004/456/215/large/wil-hughes-troll-face.jpg?1483926054" alt="profilepicture"
              className='object-cover h-32 w-32 rounded-full border-main border-2' />
            </div>
          </div>

          <div className='border-l-2 h-[400px] w-[200px] overflow-hidden rounded-r-3xl'>
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