import React, { useState } from "react";
import mkidpagestyle from "./mkidpage.module.css";
import { Link } from "react-router-dom";

function Mkidpage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={mkidpagestyle.mainbox}>
      <h1 className={mkidpagestyle.mkidmaintext}>계정 생성</h1>
      
      <label className={mkidpagestyle.inputlabel}>사용자 이름</label>
      <input className={mkidpagestyle.mkinput} placeholder="당신의 이름" />
      
      <label className={mkidpagestyle.inputlabel}>이메일</label>
      <input className={mkidpagestyle.mkinput} placeholder="이메일" />
      
      <label className={mkidpagestyle.inputlabel}>비밀번호</label>
      <div className={mkidpagestyle.passwordContainer}>
        <input 
          className={mkidpagestyle.mkinput} 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
        />
        <button 
          className={mkidpagestyle.passwordToggle} 
          onClick={togglePasswordVisibility}
          type="button"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" 
              stroke="#AAAAAA" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
              stroke="#AAAAAA" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {showPassword && (
              <path 
                d="M3 21L21 3" 
                stroke="#AAAAAA" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>
      
      <div className={mkidpagestyle.checkboxContainer}>
        <input type="checkbox" id="agreement" className={mkidpagestyle.checkbox} />
        <label htmlFor="agreement" className={mkidpagestyle.checkboxLabel}>
          약관 및 개인정보 보호정책에 동의합니다.
        </label>
      </div>
      
      <button className={mkidpagestyle.submitButton}>계정 생성</button>
      
      <p className={mkidpagestyle.loginLink}>
        이미 계정을 가지고 있나요? <Link to="/loginpage">로그인</Link>
      </p>
    </div>
  );
}

export default Mkidpage;