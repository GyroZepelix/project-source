import { Client } from "@stomp/stompjs"
import { useEffect, useState } from "react"

interface IMessage {
  sender: string
  content: string
}

const WebsocketTest = () => {

  const [chatId, setChatId] = useState<number>(10)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [messageInTextbox, setMessageInTextbox] = useState<string>("")

  const [stompClient, setStompClient] = useState<Client>(new Client({
    brokerURL: "ws://localhost:8081/chat",
    onConnect: () => {
      console.log("connected")
      setMessages([])
      stompClient.subscribe(`/channel/chat/${chatId}`, (message) => {
        console.log(`New Message Arived : ${message.body}`)
        JSON.parse(message.body).forEach((message: any) => {
          setMessages((messages) => [...messages, {
            sender: message.senderUserKey.username, 
            content: message.content}])
        })

      })
      stompClient.publish({destination: `/app/chat/${chatId}/get`})
    },
    onDisconnect: () => {
      console.log("disconnected")
    }
  }))

  useEffect(() => {
    stompClient.activate()

    return () => {
      stompClient.deactivate()
    }
  }, [])

  const onPublish = () => {
    stompClient.publish({destination: `/app/chat/${chatId}`, body: messageInTextbox})
  }

  const onPurge = () => {
    stompClient.publish({destination: `/app/chat/${chatId}/purge`})
    setMessages([])
  }

  return (
    <div className="bg-primary-500 h-screen w-screen p-2">
      <div className="flex gap-2">
        <input type="text" value={messageInTextbox} onChange={(e) => {setMessageInTextbox(e.target.value)}} className="mb-2 grow border-white border py-1 px-4 text-white bg-inherit rounded-full" />
        <button onClick={onPublish} className="mb-2 border-white border py-1 px-4 text-white hover:bg-opacity-30 hover:bg-white rounded-full">Publish</button>
        <button onClick={onPurge} className="mb-2 border-red-500 border py-1 px-4 text-red-500 hover:bg-opacity-30 hover:bg-red-500 rounded-full">Purge</button>
      </div>
      <div className="p-4 border border-white">
        {messages.map((message, index) => {
          return (
            <div key={index} className="mb-1 text-white flex">
              <span className="font-bold">{message.sender} - </span>
              <span className="ml-1">{message.content}</span>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default WebsocketTest