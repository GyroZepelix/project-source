import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import UserMessagesRepresentation from '../components/Messages/FriendMessages/UserMessagesRepresentation';
import Message from '../components/Messages/Message';

interface MessageData {
  content: string;
  senderEmail: string;
  username: string;
  image: string;
  timeSent: string;
}

// TODO: Merge by Time and Username and not only by Username

function MessagingContainer() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messageBoxRef = React.useRef<HTMLDivElement>(null);
  let previousMessage:MessageData = {} as MessageData

  const handleSendClick = () => {
    if (currentMessage !== '') {
      setMessages([
        ...messages,
        {
          content: currentMessage,
          senderEmail: 'user@example.com',
          username: 'Kob3eY',
          image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png',
          timeSent: '1:00 PM',
        },
      ]);
      setCurrentMessage('');
    }
  }

  

  const keyDownHandler = (event:KeyboardEvent) => {

    console.log(event.key);
    inputRef.current?.focus();
    
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendClick();
    }
    
  };

  useEffect(() => {
    if (messageBoxRef.current != null) messageBoxRef.current.scrollTop = messageBoxRef.current?.scrollHeight || 0;
  }, [messages]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentMessage(event.target.value);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div ref={messageBoxRef} className="mr-1 flex flex-col flex-1 overflow-y-scroll w-auto">
        <UserMessagesRepresentation username='Kob3ey' image='https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png'/>
        {messages.map((message, index) => {
        let extendsMessage = message.username == previousMessage.username;
        previousMessage = message;
        return  <Message key={index} {...message} extendsMessage={extendsMessage}/>
        })}
        <div className='opacity-0 py-4'>.</div>
      </div>
      <div className="bg-primary-750 flex justify-center items-center">
        <div className='grow mx-4 my-1 py-2 rounded-lg -translate-y-4 bg-primary-1000 flex justify-between items-center'>
          <HiPlusCircle className='mx-3.5 opacity-50 hover:opacity-100 text-2xl' />
          <input
            type="text"
            placeholder="Type your message here"
            value={currentMessage}
            onChange={handleInputChange}
            className="grow bg-inherit focus-visible:outline-0"
            ref={inputRef}
          />
          <FaPaperPlane className='mx-3.5 opacity-50 hover:opacity-100' onClick={handleSendClick}/>
        </div>
      </div>
    </div>
  );
}

export default MessagingContainer;