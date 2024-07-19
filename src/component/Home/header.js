
import React, { useState } from 'react';

import headersty from './header.module.css';
import Statusbar from "./status bar.png"

function Footer() {  // 대문자로 변경
    const [address, setAddress] = useState("대전");
  return (
    <div className={headersty.header_container}>
     
        <div className={headersty.healing}>휴식이 필요한 오늘 같은 날</div>
        <div className={headersty.read_container}>
            <div className={headersty.address}>현위치 : {address}</div>
            <div className={headersty.read}>여행 준비 중</div>
        </div>
    </div>
  );
}

export default Footer;  // 대문자로 변경