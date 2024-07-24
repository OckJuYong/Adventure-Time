import React from "react";
import Logincomstyle from "./logincom.module.css"

function Logincom(){
    return(
        <div className={Logincomstyle.logincombox}>
            <h1 className={Logincomstyle.title}>반가워요! OOO님</h1>
            <p className={Logincomstyle.subtitle}>
                서비스를 시작하기 전,<br/>
                재진님의 여행 페르소나를 생성할게요!
            </p>

            <button className={Logincomstyle.button}>페르소나 생성하기</button>
            <div className={Logincomstyle.circleContainer}>
                <div className={Logincomstyle.circle}></div>
                <div className={Logincomstyle.circle2}></div>
                <div className={Logincomstyle.circle}></div>
            </div>
        </div>
    );
}

export default Logincom;