import React, { FC, useState } from 'react';
import IChatMessage from '../../interfaces/IChatMessage';
import IMessageJointWithUser from '../../interfaces/IMessageJointWithUser';

interface IProps{
  chatMessage: IMessageJointWithUser;
  extendsMessage?: boolean;
}

// FIXME: fix time formating

const Message:FC<IProps> = ({ chatMessage, extendsMessage=false}) => {

  const [formatedTime, setFormatedTime] = useState(new Date(chatMessage.message.messageTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));

  return (
    <div className={`${!extendsMessage && "mt-2"} group flex hover:bg-primary-500 hover:bg-opacity-50 font-inter`}>
      <img src={chatMessage.sender.imagePath} alt="pfp" className={`object-cover mx-3.5 rounded-full w-10 active:translate-y-[2px] ${extendsMessage ? "opacity-0 h-0" : "h-10"}`} />
      <div className={`relative ${extendsMessage ? "flex flex-row  " : "flex flex-col"}`}>
        <p>{extendsMessage ? "" : chatMessage.sender.userKey.username} <span className={`${extendsMessage ? "group-hover:opacity-50 opacity-0 absolute -left-16 top-1.5" : "opacity-50"} ml-1 text-xs `}>{formatedTime}</span></p>
        <p className='text-mainGray break-words w-[calc(100vw-420px)]'>{chatMessage.message.content}</p>
      </div>
    </div>
  );
}

export default Message;