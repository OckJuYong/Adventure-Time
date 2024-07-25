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

import LoginUpdate from './component/logininput/personaUpdate';
import TravelQuestions from './component/logininput/personaQpage';
import InfoResult from './component/logininput/result';

import Gps from './component/GPS/Gps';
import GpsSub from './component/GPS/GpsSub';

import Dairy from './component/Diary/Diary';
import DiaryInput from './component/Diary/DiaryInput';

import Potouploadpage from './component/potoupload/potoupload';
import Potocom from './component/potocom/potocom';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persona" element={<Persona />} />
            <Route path="/personamain" element={<Perhome />} />
            <Route path="/createpage1" element={<CrePage1 />} /> 
            <Route path="/credatepage" element={<Credatepage />} /> 
            <Route path="/creproducepage" element={<Creproducepage />} /> 
            <Route path="/proposepage" element={<Proposepage />} /> 
            <Route path="/logininputpage" element={<Logininputpage />} /> 
            <Route path="/loginpage" element={<Login />} /> 
            <Route path="/mkidpage" element={<Mkidpage />} /> 
            <Route path="/logincom" element={<Logincom />} /> 
            
            <Route path="/loginUpdate" element={<LoginUpdate />} /> 
            <Route path="/TravelQuestions" element={<TravelQuestions />} /> 
            <Route path="/InfoResult" element={<InfoResult />} /> 

            <Route path="/Gps" element={<Gps />} /> 
            <Route path="/GpsSub" element={<GpsSub />} /> 
            <Route path="/Diary" element={<Dairy />} /> 
            <Route path="/DiaryInput" element={<DiaryInput />} /> 

            <Route path="/potouploadpage" element={<Potouploadpage/>} />
            <Route path="/potocompage" element={<Potocom/>} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}



export default App;