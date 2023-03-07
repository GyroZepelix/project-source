import { useNavigate } from 'react-router'
import homeButton from '../assets/homeButton.svg'
import ServerButton from './ServerSelection/ServerButton'

const mockServers:any[] = [
  {name: "test1", serverId:"1", image: "https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg"}, 
  {name: "test2", serverId:"2", image: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"},
  {name: "test3", serverId:"3", image: "https://yt3.googleusercontent.com/_DiGCcjGwJQAZ3zmlyB8TCYuA8O9tDJ9zGNysq5sR0rxwYb6SP5fW8cb3LbfcRwfui0m27oIhA=s900-c-k-c0x00ffffff-no-rj"},
]

const appRoot = '/app'

const ServerNavigator = () => {
  const navigate = useNavigate()

  const onClickHome = () => {
    navigate(appRoot)
  }

  const onClickServer = (serverId: string) => {
    navigate(`${appRoot}/${serverId}`)
  }

  return (
    <nav className='bg-primary-250 h-full px-2 py-4 gap-2 flex flex-col items-center select-none'>
        <div className='cursor-pointer' onClick={onClickHome}>
          <img className='h-[50px] select-none pointer-events-none' src={homeButton} alt="Home Button" />
        </div>
      <div className='bg-primary-750 w-10 h-[3px] rounded' />
      {mockServers.map((server) => (
        <ServerButton key={server.serverId} {...server} onClick={() => {onClickServer(server.serverId)}} />
      ))
      }
    </nav>
  )
}

export default ServerNavigator