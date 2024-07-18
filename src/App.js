import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home/home';
import Persona from './component/persona/persona';  // 대문자로 변경

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persona" element={<Persona />} />  // 대문자로 변경
        </Routes>
    </BrowserRouter>
  );
}

export default App;