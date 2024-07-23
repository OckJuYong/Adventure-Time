import React from "react";
import Loginhomestyle from "./loginhome.module.css"
import { useNavigate } from "react-router-dom";

function Logininputpage(){
    const navigate=useNavigate()
    const handleidinputclick=()=>{
        navigate("/mkidpage")
    }
    return(
        <div>
        <div className={Loginhomestyle.loginhomemainbox}>
            <p className={Loginhomestyle.loginmaintext}>함께 떠나요!</p>
            <p className={Loginhomestyle.loginextext1}>평범한 일상.</p>
            <p className={Loginhomestyle.loginextext2}>당신의 여행 페르소나를 생성하고</p>
            <p className={Loginhomestyle.loginextext3}>여행 메이트를 찾아 함께 떠나봐요!</p>
        </div>
        <div  className={Loginhomestyle.inputbuttonbox}>
            <p className={Loginhomestyle.logininput}>로그인</p>
            <p className={Loginhomestyle.mkidinput}onClick={handleidinputclick}>계정생성</p>
        </div>
        </div>
    );
    
}
export default Logininputpage 


