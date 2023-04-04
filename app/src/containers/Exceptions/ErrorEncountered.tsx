import { AxiosError } from 'axios'
import { FC, useEffect } from 'react'
import ProjectSourceLogo from '../../assets/projectsource.svg'

interface IProps {
  error?: AxiosError
}

const ErrorEncountered:FC<IProps> = ({error}) => {

  // useEffect(() => {
  //   console.error(error)
  // }, [error])

  return (
    <div className='font-inter font-bold flex flex-row font-inter h-screen w-screen bg-primary-750' >
      <div className='flex flex-row justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center'>
          <img className='h-48 animate-bounce mb-4' src={ProjectSourceLogo} alt="Project Source logo" />
          <div className='text-4xl text-primary-100 text-main'>There has been an error!</div>
          {error ? 
            <div className='text-2xl text-primary-100 text-main'>{error.message}</div>
            :
            <div className='text-2xl text-primary-100 text-main'>You will be redirected to the login page</div>
          }
        </div>
      </div>
    </div>
  )
}

export default ErrorEncountered