import React from 'react';
import icon1 from './Component 1.png';
import icon2 from './Component 2.png';
import icon3 from './Component 3.png';

import footerStyles from './footer.module.css'

function Footer() {  // 대문자로 변경
  return (
    <div className={footerStyles.main_container}>
      <img src={icon1} alt="Icon 1" className={footerStyles.icon} />
      <img src={icon2} alt="Icon 2" className={footerStyles.icon} />
      <img src={icon3} alt="Icon 3" className={footerStyles.icon} />
    </div>
  );
}

export default Footer;  // 대문자로 변경