import React, { useState, useEffect, useRef } from "react";
import styles from "./insightWrite.module.css";
import { useNavigate } from 'react-router-dom';
import backBtn from '../logininput/back.png';
import loading from '../persona/Loading.png';

function InsightWrite() {
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
    navigate('/insight');
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

  const handleCreateDiary = () => {
    navigate('/createDiary');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.chatFullScreen}>
      <div className={styles.header}>
        <img onClick={goBack} src={backBtn} className={styles.back_btn} alt="Go Back" />
      </div>
      <div className={styles.chatGradient}></div>
      <div className={styles.chatWrapper}>
        <div className={styles.chatContent}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
              {message.text}
            </div>
          ))}
        {messages.length >= 20 && (
            <span onClick={handleCreateDiary} className={styles.ChatEndButton}>
                대화종료
            </span>
        )}
        {messages.length >= 20 && (
            <button onClick={handleCreateDiary} className={styles.createDiaryButton}>
                여행일기 생성
            </button>
        )}
          {isWaitingForAIResponse && (
            <div className={`${styles.message} ${styles.ai}`}>
              <img src={loading} alt="Loading" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {messages.length < 20 && (
        <form onSubmit={handleSend} className={styles.inputArea}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지 입력"
                className={styles.inputField}
            />
            <button type="submit" className={styles.sendButton}>전송</button>
        </form>
        )}


    </div>
  )
} 

export default InsightWrite;