import React, { useState, useEffect, useRef } from "react";
import personastyle from "./persona.module.css";
import { useNavigate } from 'react-router-dom';

function Persona() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatWrapperRef = useRef(null);

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // 최대 3개의 최신 메시지만 유지
        setMessages(parsedMessages.slice(-6));
      }
      setIsLoading(false);
    };

    loadMessages();
  }, []);

  useEffect(() => {
    if (!isLoading && chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
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
      <div className={personastyle.chatWrapper} ref={chatWrapperRef}>
        {messages.map((message, index) => (
          <div key={index} className={`${personastyle.message} ${personastyle[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={personastyle.inputPersonmain} onClick={personaChat}></div>
    </div>
  );
}

export default Persona;