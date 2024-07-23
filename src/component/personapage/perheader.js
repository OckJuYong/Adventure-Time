import React, { useState } from "react";
import perheaderstyle from "./perheader.module.css";
import mateplusebutton from"./mateplusebutton.png"
function Perheader() {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className={perheaderstyle.perheadercontainer}>
            <div className={perheaderstyle.perheadertext}>내 메이트</div>
            <div className={perheaderstyle.toggleswitch}>
                <div className={perheaderstyle.togglebutton} onClick={handleToggle}>
                    <div className={perheaderstyle.toggletextleft}>메이트</div>
                    <div className={perheaderstyle.toggletextright}>가이드</div>
                    <div className={`${perheaderstyle.togglecircle} ${isOn ? perheaderstyle.on : perheaderstyle.off}`}></div>
                </div>
                <div className={perheaderstyle.mymatecontainer}>
                    <img src={mateplusebutton} className={perheaderstyle.mateplusebutton}></img>
                </div>
            </div>
        </div>
    );
}

export default Perheader;
