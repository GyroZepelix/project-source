import {HiArrowRight, HiPlusSm} from 'react-icons/hi'
import { useNavigate } from 'react-router'
import DirectMessageUserButton from './DirectMessageUserButton'
import { GlobalParametersContext } from '../../../containers/ApplicationMain'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import IChatJointWithUser from '../../../interfaces/IChatJointWithUser'

const DirectMessages = () => {
  const navigate = useNavigate()
  const globalParams = useContext(GlobalParametersContext)
  const [chatsMap, setChatsMap] = useState<Map<string, IChatJointWithUser>>(globalParams.privateChatsById.get)
  const chats:IChatJointWithUser[] = Array.from(chatsMap.values())

  useEffect(() => {
    console.log('test')
  }, [])

  useEffect(() => {
    setChatsMap(globalParams.privateChatsById.get)
  }, [globalParams.privateChatsById.get])

  const onAddButtonClick = () => { navigate('/channels/@me/add')
  }

  return (
    <div>
      <div className='select-none my-2 mx-5 flex justify-between items-center'>
        <p className='opacity-70 text-xs font-semibold hover:opacity-100'>DIRECT MESSAGES</p>
        <HiPlusSm onClick={onAddButtonClick} className='text-xl cursor-pointer'/>
      </div>
      <div className='mx-2'>
        { chats.length > 0 &&
          chats.map((chat) => (
            <DirectMessageUserButton key={chat.chat.chatId} unreadMessages={chat.unreadMessages} selected={chat.chat.chatId == globalParams.channelId} name={chat.receiver.userKey.username} image={chat.receiver.imagePath} onClick={() => {navigate(`/channels/@me/${chat.chat.chatId}`)}} />
          ))
        }
      </div>
    </div>
  )
}

export default DirectMessages