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

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/personamain" element={<Perhome />}></Route>
        <Route path="/createpage1" element={<CrePage1 />} /> 
        <Route path="/credatepage" element={<Credatepage />} /> 
        <Route path="/creproducepage" element={<Creproducepage />} /> 
        <Route path="/proposepage" element={<Proposepage />} /> 
        <Route path="/logininputpage" element={<Logininputpage />} /> 
        <Route path="/loginpage" element={<Login />} /> 
        <Route path="/mkidpage" element={<Mkidpage />} /> 
        <Route path="/logincom" element={<Logincom />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;