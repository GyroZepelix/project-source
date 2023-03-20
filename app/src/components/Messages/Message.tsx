import React, { FC } from 'react';

interface MessageProps {
  content: string;
  username: string;
  senderEmail: string;
  image: string;
  timeSent: string;
  extendsMessage?: boolean;
}

const Message:FC<MessageProps> = ({ content, username, senderEmail, image, timeSent, extendsMessage=false}) => {
  return (
    <div className={`${!extendsMessage && "mt-2"} group flex hover:bg-primary-500 hover:bg-opacity-50 font-inter`}>
      <img src={image} alt="pfp" className={`mx-3.5 rounded-full h-10 w-10 active:translate-y-[2px] ${extendsMessage && "opacity-0 h-1"}`} />
      <div className={`relative ${extendsMessage ? "flex flex-row  " : "flex flex-col"}`}>
        <p>{extendsMessage ? "" : username} <span className={`${extendsMessage && "group-hover:opacity-50 opacity-0 absolute -left-16 top-1.5"} ml-1 text-xs opacity-50`}>{timeSent}</span></p>
        <p className='opacity-75'>{content}</p>
      </div>
    </div>
  );
}

export default Message;