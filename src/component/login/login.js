import React, { useState } from "react";
import Loginstyle from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  return (
    <div className={Loginstyle.container}>
      <h1 className={Loginstyle.title}>로그인</h1>
      
      <div className={Loginstyle.inputGroup}>
        <label className={Loginstyle.label}>이메일 주소</label>
        <div className={Loginstyle.inputWrapper}>
          <input 
            type="email" 
            placeholder="email@gmail.com" 
            className={Loginstyle.input}
            value={email}
            onChange={handleEmailChange}
          />
          <div className={Loginstyle.checkmark}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill={isValidEmail ? "#6285E1" : "#CCCCCC"} />
              <path d="M7 13L10 16L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className={Loginstyle.inputGroup}>
        <label className={Loginstyle.label}>비밀번호</label>
        <div className={Loginstyle.inputWrapper}>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            className={Loginstyle.input} 
          />
          <button 
            className={Loginstyle.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {showPassword && (
                <path d="M3 21L21 3" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      <a href="#" className={Loginstyle.forgotPassword}>비밀번호를 잊어버렸나요?</a>
      
      <button className={Loginstyle.loginButton}>로그인</button>
      
      <p className={Loginstyle.signupLink}>
        아직 계정이 없으신가요? <Link to="/mkidpage">계정생성</Link>
      </p>
    </div>
  );
}

export default Login;