import ProjectSourceLogo from '../../assets/projectsource.svg'

const Disconnected = () => {
  return (
    <div className='font-inter font-bold flex flex-row font-inter h-screen w-screen bg-primary-750' >
      <div className='flex flex-row justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center'>
          <img className='h-48 animate-bounce mb-4' src={ProjectSourceLogo} alt="Project Source logo" />
          <div className='text-4xl text-primary-100 text-main'>Connecting</div>
          <div className='text-2xl text-primary-100 text-main'>You will be redirected soon...</div>
        </div>
      </div>
    </div>
  )
}

export default Disconnected