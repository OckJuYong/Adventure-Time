import React, { useState } from "react";
import styles from "./firstemate.module.css";
import mate from  "./Vector.png"

function Firstmatepage() {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className={styles.mainbox}>
            <div className={styles.header}>
                <h1 className={styles.title}>여행 메이트</h1>
                
                <div className={styles.togglebutton} onClick={handleToggle}>
                    <div className={`${styles.toggleoption} ${!isOn ? styles.active : ''}`}>
                        <p className={styles.text1}>메이트</p>
                    </div>
                    <div className={`${styles.toggleoption} ${isOn ? styles.active : ''}`}>
                        <p className={styles.text2}>가이드</p>
                    </div>
                    <div className={`${styles.togglecircle} ${isOn ? styles.on : styles.off}`}></div>
                </div>
            </div>

            <div className={styles.subHeader}>
                <p className={styles.noMateText}>메이트가 아직 없습니다.</p>
                <div className={styles.mateManageIconContainer}>
        <div className={styles.mateManageCircle}>
           <img className={styles.img} src={mate}></img>
        </div>
        <div className={styles.mateManageIcon}>
            메이트 관리
        </div>
    </div>
</div>
            <div className={styles.divider}></div>

            <div className={styles.content}>
                <p className={styles.createMateText}>여행을 만들고 메이트와 함께<br />여행을 떠나봐요!</p>
                
                <button className={styles.createTripButton}>여행 만들기</button>
            </div>

       
        </div>
    );
}

export default Firstmatepage;