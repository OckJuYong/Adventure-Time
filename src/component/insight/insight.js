import React from 'react';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';

import Sty from './insight.module.css';

import list from './list.png';
import heart from './heart.png';

function Home() {  
  const navigate = useNavigate();

  const insightWrite = () => {
    navigate('/insightWrite');
  }
  
  return (
    <div className={Sty.body}>
      <h1>여행일기</h1>
      <div className={Sty.main_container}>
        <div className={Sty.header}>
          <img src={list} className={Sty.list}/>
          <img src={heart} className={Sty.heart}/>
        </div>
        <div className={Sty.notInfo_container}>
          <h2 className={Sty.NotYet}>아직 여행 일기가 없습니다.</h2>
          <div className={Sty.Sub}>
            <p>내 페르소나와 여행에 대한</p>
            <p>대화를 하며 커버 이미지와 함께</p>
            <p>여행 일기를 생성해줍니다.</p>
          </div>
        </div>
        <button className={Sty.Write_btn} onClick={insightWrite}>여행 일기 쓰기</button>
        <Footer /> 
      </div>
    </div>
  );
}

export default Home;
