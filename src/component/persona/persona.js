import React, { useState, useEffect } from "react";
import personastyle from "./persona.module.css";
import { useNavigate } from 'react-router-dom';

function Persona() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 메시지를 불러옵니다.
  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('chatMessages');
      console.log(savedMessages);
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

  const personaChat = () => {
    navigate('/persona');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={personastyle.PerContainer}>
      <div className={personastyle.inputPersonmain} onClick={personaChat}></div>
      <div className={personastyle.chatWrapper}>
        {messages.map((message, index) => (
          <div key={index} className={`${personastyle.message} ${personastyle[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Persona;
