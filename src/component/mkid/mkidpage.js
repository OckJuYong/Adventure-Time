import React from "react";
import mkidpagestyle from "./mkidpage.module.css"
function Mkidpage(){
    return(
        <div className={mkidpagestyle.mainbox}>
            <p className={mkidpagestyle.mkidmaintext}>계정 생성</p>
            <p className={mkidpagestyle.inputlabel1}>사용자 이름</p>
            <input className={mkidpagestyle.mkinput}placeholder="당신의 이름"></input>
            
            <p className={mkidpagestyle.inputlabel1}>이메일</p>
            <input className={mkidpagestyle.mkinput}placeholder="이메일"></input>
        </div>
    )


}
export default Mkidpage;