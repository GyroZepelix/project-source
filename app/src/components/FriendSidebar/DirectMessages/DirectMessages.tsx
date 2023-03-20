import {HiPlusSm} from 'react-icons/hi'
import { useNavigate } from 'react-router'
import IUserDirectMessages from '../../../interfaces/IUserDirectMessages'
import DMUser from './DMUser'

const directMessageUsers: IUserDirectMessages[] = [
  {
    name: 'Kob3ey',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png',
    id: '1'
  },
  {
    name: 'Tomic',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png',
    id: '2'
  },
  {
    name: 'Plejic',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png',
    id: '3'
  }
]

const DirectMessages = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='select-none my-2 mx-5 flex justify-between items-center'>
        <p className='opacity-70 text-xs font-semibold hover:opacity-100'>DIRECT MESSAGES</p>
        <HiPlusSm className='text-xl cursor-pointer'/>
      </div>
      <div className='mx-2'>
        {
          directMessageUsers.map((user) => (
            <DMUser key={user.name} name={user.name} image={user.image} onClick={() => {navigate(`/channels/@me/${user.id}`)}} />
          ))
        }
      </div>
    </div>
  )
}

export default DirectMessages