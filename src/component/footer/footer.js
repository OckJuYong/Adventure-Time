import React from 'react';
import icon1 from './Component 1.png';
import icon2 from './Component 2.png';
import icon3 from './Component 3.png';

import footerStyles from './footer.module.css'
import { useNavigate } from 'react-router-dom';

function Footer() {  // 대문자로 변경
  const navigate=useNavigate()
  const handlepersonclick=()=>{
    navigate("/personamain")

  }
  const handlehomeonclick=()=>{
    navigate("/")

  }
  return (
    <div className={footerStyles.main_container}>
      <img src={icon1} alt="Icon 1" className={footerStyles.icon} onClick={handlehomeonclick}/>
      <img src={icon2} alt="Icon 2" className={footerStyles.icon} />
      <img src={icon3} alt="Icon 3" className={footerStyles.icon} onClick={handlepersonclick} />
    </div>
  );
}

export default Footer;  // 대문자로 변경