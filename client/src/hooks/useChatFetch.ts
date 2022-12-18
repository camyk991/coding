import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../API";

type messageData = {
  inviterID: string;
  inviterMail: string;
  inviterName: string;
  messages: singleMessage[]
}

type singleMessage = {
  author: boolean;
  content: string;
  createdAt: string;
}

export const useChatFetch = () => {


  const [messages, setMessages] = useState<messageData>()
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const chatId = useParams().id?.toString();


  const rawStoredData = localStorage.getItem('user')
  const userStoredData = rawStoredData ? JSON.parse(rawStoredData) : null;

  const fetchMessages = async() => {
    try {
      // setLoading(true)
      if (!chatId)
        return;

      const msgs = await API.fetchMessages(userStoredData.id, chatId);
      setMessages(msgs);

    } catch (err) {
      console.log("ERROR!")
    }
  }

  useEffect(() => {
    setInterval(() => {
      fetchMessages();
    }, 500)
  }, [])

  return {
    messages,
    loading
  }
}