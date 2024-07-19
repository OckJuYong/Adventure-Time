import React, { useState, useEffect } from "react";
import personasChatsty from "./personaChat.module.css";
import { useNavigate } from 'react-router-dom';

function PersonaChat() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 메시지를 불러옵니다.
  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      setIsLoading(false);
    };

    loadMessages();
  }, []);

  // messages 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  const goBack = () => {
    navigate('/');
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      // AI 응답을 시뮬레이션합니다. 실제로는 여기에 AI API 호출 로직이 들어갑니다.
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "AI의 응답입니다.", sender: 'ai' }]);
      }, 1000);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={personasChatsty.chatFullScreen}>
      <div className={personasChatsty.header}>
        <button onClick={goBack} className={personasChatsty.backButton}>
          &lt;
        </button>
        <div className={personasChatsty.headerTitle}>채팅</div>
      </div>
      <div className={personasChatsty.chatWrapper}>
        {messages.map((message, index) => (
          <div key={index} className={`${personasChatsty.message} ${personasChatsty[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className={personasChatsty.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력"
          className={personasChatsty.inputField}
        />
        <button type="submit" className={personasChatsty.sendButton}>전송</button>
      </form>
    </div>
  )
} 

export default PersonaChat;