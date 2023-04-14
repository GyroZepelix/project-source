import { StompSubscription } from '@stomp/stompjs';
import React, { useContext, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import UserMessagesRepresentation, { IUserMessagesRepresentationProps } from '../components/Messages/FriendMessages/UserMessagesRepresentation';
import Message from '../components/Messages/Message';
import { GlobalParametersContext } from './ApplicationMain';
import IMessageJointWithUser from '../interfaces/IMessageJointWithUser';

// TODO: Merge by Time and Username and not only by Username

function MessagingContainer() {
  const globalParams = useContext(GlobalParametersContext)
  const [messages, setMessages] = useState<IMessageJointWithUser[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messageBoxRef = React.useRef<HTMLDivElement>(null);
  let previousMessage:IMessageJointWithUser = {} as IMessageJointWithUser;
  const websocketHeaders = {Authorization: `Bearer ${globalParams.auth?.token}`}
  let banner: IUserMessagesRepresentationProps = {} as IUserMessagesRepresentationProps;
  if (globalParams.serverId == '@me') {
    banner = {
      username: globalParams.privateChatsById.get.get(globalParams.channelId)?.receiver.userKey.username || '',
      image: globalParams.privateChatsById.get.get(globalParams.channelId)?.receiver.imagePath || ''
    }
  }


  const keysToIgnore = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const keyDownHandler = (event:KeyboardEvent) => {

    if (!keysToIgnore.includes(event.key)) inputRef.current?.focus();
    
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendClick();
    }
    
  };

  const handleSendClick = () => {
    let recieverEmail = {}
    if (globalParams.channelId != '') {
      recieverEmail = {'Receiver-Email': globalParams.privateChatsById.get.get(globalParams.channelId)?.receiver.email || ''}
    }
    if (currentMessage !== '' && globalParams.stompClient != null) {
      globalParams.stompClient.publish({
        destination: `/app/chat/${globalParams.channelId}`,
        body: currentMessage,
        headers: {...websocketHeaders, ...recieverEmail}
      });
      setCurrentMessage('');
    }
  }

  useEffect(() => {
    let subscription: StompSubscription | undefined = undefined;
    const channelId = globalParams.channelId;
    const clientConnectedAndChannelSelected = globalParams.stompClient != undefined && channelId != null && channelId !== '' && globalParams.stompClient.active;
    if (clientConnectedAndChannelSelected) {
      subscription = globalParams.stompClient?.subscribe(`/channel/chat/${channelId}`, (message) => {
        const recievedMessages = JSON.parse(message.body);
        if (Array.isArray(recievedMessages)) {
          setMessages(JSON.parse(message.body));
        } else {
          setMessages((messages) => [...messages, recievedMessages]);
        }
      });
      globalParams.stompClient?.publish({destination: `/app/chat/${channelId}/get`, headers: websocketHeaders})
      console.log("subscribed to channel", channelId);
    } else {
      setMessages([]); 
    }


    return () => {
      if (subscription != undefined) {
        subscription.unsubscribe();
        console.log("unsubscribed from channel" + channelId);
      }

    }
  }, [globalParams.channelId, globalParams.stompClient]);




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
    <div className="flex flex-col h-full grow">
      <div ref={messageBoxRef} className="mr-1 flex flex-col flex-1 overflow-y-scroll w-auto overflow-x-clip">
        { banner && <UserMessagesRepresentation {...banner}/>}
        {messages.map((message, index) => {
        let extendsMessage = message.sender.email == previousMessage.sender?.email;
        previousMessage = message;
        return  <Message key={index} chatMessage={message} extendsMessage={extendsMessage}/>
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