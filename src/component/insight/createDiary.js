import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoneImg from './NoneImg.png';
import backImg from '../logininput/back.png';
import CreateDiarySty from './createDiary.module.css';

import H_T from './H_T.png';
import H_F from './H_F.png';

function CreateDiary() {  
  const navigate = useNavigate();

  const [travel, setTravel] = useState("전주 여행");
  const [day, setDay] = useState("");
  const [activity, setActivity] = useState(["한옥마을 탐방", "비 오는 날 산 위에서 야경감상"]);
  const [food, setFood] = useState(["전주 비빔밥"]);
  const [study, setStudy] = useState(["새로운 여행 방식의 재미와 경험"]);
  const [isHeart, setIsHeart] = useState(false); // 하트 이미지 상태를 관리하는 state

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    setDay(formattedDate);
  }, []);

  const goBack = () => {
    navigate(-1);
  }

  const ReusltBtn = () => {
    navigate("/Insight");
  }

  const toggleHeart = () => {
    setIsHeart(!isHeart); // 하트 상태를 토글
  }

  return (
    <div className={CreateDiarySty.pageContainer}>
      <img src={backImg} className={CreateDiarySty.backBtn} onClick={goBack} alt="Back"/>
      <div className={CreateDiarySty.container}>
        <img src={NoneImg} alt="None" className={CreateDiarySty.img}/>
        <div className={CreateDiarySty.headerContainer}>
          <div className={CreateDiarySty.leftHeaderContainer}>
            <h2>{travel}</h2>
            <p>{day}</p>
          </div>
          <div className={CreateDiarySty.rightHeaderContainer}>
            <div className={CreateDiarySty.profileCircle}></div>
            <p>with 연아님</p>
          </div>
        </div>
        <div className={CreateDiarySty.mainContainer}>
          <div className={CreateDiarySty.section}>
            <h3>주요 활동</h3>
            {activity.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className={CreateDiarySty.section}>
            <h3>음식 경험</h3>
            {food.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className={CreateDiarySty.section}>
            <h3>배운 점</h3>
            {study.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className={CreateDiarySty.footer_container}>
            <button onClick={ReusltBtn} className={CreateDiarySty.confirmButton}>확인</button>
            <img 
              src={isHeart ? H_T : H_F} 
              className={CreateDiarySty.H_T}
              onClick={toggleHeart}
              alt="Heart"
            />
        </div>
      </div>
    </div>
  );
}

export default CreateDiary;