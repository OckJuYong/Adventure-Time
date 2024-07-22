import React from "react";
import Crechoicestyle from "./crechoice.module.css" 
function Crechoice(){
    return(

        <div className={Crechoicestyle.choicebox}>
            <div className={Crechoicestyle.Crebackbutton}></div>
            <p className={Crechoicestyle.choicetext1}>OO님과 함께 가고 싶은</p>
            <p className={Crechoicestyle.choicetext2}>여행지를 선택해봐요!!</p>

            <p className={Crechoicestyle.choicprtext}>알고리즘 추천 여행지</p>
            <div className={Crechoicestyle.chicecontainer}></div>
        </div>
    );
}
export default Crechoice;