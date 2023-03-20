import React, { FC } from 'react'

interface IProps {
  username: string
  image: string
}

const UserMessagesRepresentation:FC<IProps> = ({username, image}) => {
  return (
    <div className='select-none gap-4 flex-col border-b-2 border-primary-1000 p-8 flex items-start'>
      <img className='h-20 w-20 rounded-full pointer-events-none' src={image} alt="" />
      <h2 className='font-bold text-3xl'>{username}</h2>
    </div>
  )
}

export default UserMessagesRepresentation