import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoResultSty from './result.module.css';

import personaImg from './personaImg.jpg';

const InfoResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers } = location.state || { answers: [] };



  const [user_persona, setUser_persona] = useState("뉴욕형 페르소나");

  console.log("Answers:", answers); 

  const handleIdInputClick = () => {
    navigate("/");
  };


  return (
    <div className={InfoResultSty.main_container}>
      <div className={InfoResultSty.pre_container}>
        <h1 className={InfoResultSty.user_pre}>{user_persona}</h1>
        <img src={personaImg} className={InfoResultSty.personaImg}/>
      </div>

      <button onClick={handleIdInputClick} className={InfoResultSty.next_btn}>서비스 이용하러 가기</button>
    </div>
  );
};

export default InfoResult;
