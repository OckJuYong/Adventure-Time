import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home/home';
import Persona from './component/persona/personaChat'; 
import Perhome from "./component/personapage/perhome"
import CrePage1 from './component/cretravel/createpage1';
import Credatepage from './component/credate/credatepage';
import Creproducepage from './component/creproduce/creproducepage';
import Proposepage from './component/propose/proposepage';
import Logininputpage from './component/logininput/loginhome';
import Mkidpage from './component/mkid/mkidpage';
import Login from './component/login/login';
import Logincom from './component/logincom/logincom';

import Dashboard from './component/login/dashboard';

import LoginUpdate from './component/logininput/personaUpdate';
import TravelQuestions from './component/logininput/personaQpage';
import InfoResult from './component/logininput/result';

import Gps from './component/GPS/Gps';
import GpsSub from './component/GPS/GpsSub';

import Dairy from './component/Diary/Diary';
import DiaryInput from './component/Diary/DiaryInput';

import Potouploadpage from './component/potoupload/potoupload';
import Potocom from './component/potocom/potocom';

import UploadWait from './component/potoupload/uploadWait';

import Insight from './component/insight/insight';
import InsightWrite from './component/insight/insightWrite';

import CreateDiary from './component/insight/createDiary';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <div className="content">
          <Routes>
            <Route path="/" element={<Logininputpage />} /> //시작 페이지
            <Route path="/loginpage" element={<Login />} />  //로그인 페이지
            <Route path="/mkidpage" element={<Mkidpage />} />   //회원가입
            <Route path="/logincom" element={<Logincom />} />  //로그인 성공 페이지
            <Route path="/potouploadpage" element={<Potouploadpage/>} />  //이미지 업로드 페이지
            //이미지 업로드 페이지 들가야함
            <Route path="/potocompage" element={<Potocom/>} />  //완성페이지
            <Route path="/InfoResult" element={<InfoResult />} />  //페르소나 소개 페이지


            <Route path="/home" element={<Home />} />
            <Route path="/persona" element={<Persona />} />
            <Route path="/personamain" element={<Perhome />} />
            <Route path="/createpage1" element={<CrePage1 />} /> 
            <Route path="/credatepage" element={<Credatepage />} /> 
            <Route path="/creproducepage" element={<Creproducepage />} /> 
            <Route path="/proposepage" element={<Proposepage />} /> 
            
            <Route path="/loginUpdate" element={<LoginUpdate />} /> 
            <Route path="/TravelQuestions" element={<TravelQuestions />} /> 

            <Route path="/Gps" element={<Gps />} /> 
            <Route path="/GpsSub" element={<GpsSub />} /> 
            <Route path="/Diary" element={<Dairy />} /> 
            <Route path="/DiaryInput" element={<DiaryInput />} /> 



            <Route path="/dashboard" element={<Dashboard/>} />


            <Route path="/UploadWait" element={<UploadWait/>} />

            <Route path="/Insight" element={<Insight/>} />
            <Route path="/insightWrite" element={<InsightWrite/>} />
            <Route path="/CreateDiary" element={<CreateDiary/>} />



          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}



export default App;