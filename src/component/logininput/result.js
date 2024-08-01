import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoResultSty from './result.module.css';

import personaImg from './personaImg.jpg';

const InfoResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers } = location.state || { answers: [] };

  const [user_persona] = useState("뉴욕형 페르소나");
  const [extractedWords] = useState(["도시", "문화", "예술"]);

  console.log("Answers:", answers); 
  
  const handleIdInputClick = () => {
    navigate("/home");
  };

  return (
    <div className={InfoResultSty.responsive_container}>
      <div className={InfoResultSty.main_container}>
        <div className={InfoResultSty.pre_container}>
          <h1 className={InfoResultSty.user_pre}>{user_persona}</h1>
          <img src={personaImg} alt="Persona" className={InfoResultSty.personaImg}/>
        </div>
        <p className={InfoResultSty.extracted_words_title}>추출한 단어</p>
        <div className={InfoResultSty.extracted_words_container}>
          {extractedWords.map((word, index) => (
            <span key={index} className={InfoResultSty.extracted_word}>{word}</span>
          ))}
        </div>
        <button onClick={handleIdInputClick} className={InfoResultSty.next_btn}>서비스 이용하러 가기</button>
      </div>
    </div>
  );
};

export default InfoResult;