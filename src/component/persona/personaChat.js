import React, { useState, useEffect, useRef } from "react";
import personasChatsty from "./personaChat.module.css";
import { useNavigate } from 'react-router-dom';
import backBtn from '../logininput/back.png';
import loading from './Loading.png';

function PersonaChat() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingForAIResponse, setIsWaitingForAIResponse] = useState(false);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const goBack = () => {
    navigate('/home');
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      setIsWaitingForAIResponse(true);
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "AI의 응답입니다.", sender: 'ai' }]);
        setIsWaitingForAIResponse(false);
      }, 1000);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={personasChatsty.chatFullScreen}>
      <div className={personasChatsty.header}>
        <img onClick={goBack} src={backBtn} className={personasChatsty.back_btn} alt="Go Back" />
      </div>
      <div className={personasChatsty.chatWrapper}>
        <div className={personasChatsty.chatContent}>
          {messages.map((message, index) => (
            <div key={index} className={`${personasChatsty.message} ${personasChatsty[message.sender]}`}>
              {message.text}
            </div>
          ))}
          {isWaitingForAIResponse && (
            <div className={`${personasChatsty.message} ${personasChatsty.ai}`}>
              <img src={loading} alt="Loading" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
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