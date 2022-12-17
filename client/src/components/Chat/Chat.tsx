import React, {useEffect, useState} from 'react'
import API, { UserInfoType } from '../../API';
import { useChatFetch } from '../../hooks/useChatFetch';
import { useParams } from "react-router-dom";

import {io} from "socket.io-client"

type Props = {
  userData: UserInfoType | undefined;
}

const Chat: React.FC<Props> = ({userData}) => {

  const {messages, loading} = useChatFetch();
  const [socket, setSocket] = useState<any>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  const [text, setText] = useState('');

  const chatId = useParams().id?.toString();

  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    // socket.current.on("getMessage", (data: any) => {
    //   setArrivalMessage({
    //     sender: data.senderId,
    //     text: data.text,
    //     createdAt: Date.now(),
    //   });
    // });
  }, []);

  useEffect(() => {
    // setSocket(io("ws://localhost:8900"))
  }, [])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);

    if (!text)
      return;

    let d = new Date();

    const mesObj = {author: true, content: text, createdAt: d}

    const res = await API.sendMessage(userData?.id, chatId, mesObj)
  }

  return (
    <div>
        <div>{messages?.inviterName}</div>
        <div>
          {messages && messages.messages?.length > 0 && messages.messages.map((el) => {
            return (<span key={el.createdAt} className={el.author ? 'sent' : 'got'}>{el.content}</span>)
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" name='message' onChange={(e) => setText(e.currentTarget.value)}/>
          <input type="submit" value="Wyślij" />
        </form>
    </div>
  )
}

export default Chat
