import React, { FC, useContext } from 'react'
import { GlobalParametersContext } from '../../../containers/ApplicationMain'
import IUser from '../../../interfaces/IUser'

export interface IUserMessagesRepresentationProps {
  username: string
  image: string
}

const UserMessagesRepresentation:FC<IUserMessagesRepresentationProps> = ({username, image}) => {

  return (
    <div className='select-none gap-4 flex-col border-b-2 border-primary-1000 p-8 flex items-start'>
      <img className='h-20 w-20 rounded-full pointer-events-none object-cover' src={image} alt="" />
      <h2 className='font-bold text-3xl'>{username}</h2>
    </div>
  )
}

export default UserMessagesRepresentation