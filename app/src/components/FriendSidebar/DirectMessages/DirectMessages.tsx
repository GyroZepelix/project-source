import {HiPlusSm} from 'react-icons/hi'
import IUserDirectMessages from '../../../interfaces/IUserDirectMessages'
import DMUser from './DMUser'

const directMessageUsers: IUserDirectMessages[] = [
  {
    name: 'Kob3ey',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png'
  },
  {
    name: 'Tomic',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png'
  },
  {
    name: 'Plejic',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png'
  }
]

const DirectMessages = () => {
  return (
    <div>
      <div className='select-none my-2 mx-5 flex justify-between items-center'>
        <p className='opacity-70 text-xs font-semibold hover:opacity-100'>DIRECT MESSAGES</p>
        <HiPlusSm className='text-xl cursor-pointer'/>
      </div>
      <div className='mx-2'>
        {
          directMessageUsers.map((user) => (
            <DMUser key={user.name} name={user.name} image={user.image} />
          ))
        }
      </div>
    </div>
  )
}

export default DirectMessages