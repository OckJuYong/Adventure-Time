import React from "react"; 
import potocomstyle from"./potocom.module.css";

function Potocom() {

    return(
        <div className={potocomstyle.potocombox}>
            <p className={potocomstyle.title}>OO님의 페르소나는?</p>
            <p className={potocomstyle.subtitle}>생성 완료!!</p>
            <p className={potocomstyle.inputbutton}>내 여행 페르소나</p>
        </div>
    )
}
export default Potocom;