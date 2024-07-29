import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // 추가된 부분
import styles from "./firstemate.module.css";
import mate from  "./Vector.png"

function Firstmatepage() {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();  // 추가된 부분

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const mate_travel = () => {
        navigate("/nextpage");  // 여행 만들기 페이지로 이동
    }

    const manageMate = () => {
        navigate("/manage-mate");  // 메이트 관리 페이지로 이동
    }

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
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
                        <div className={styles.mateManageIconContainer} onClick={manageMate}>  {/* onClick 추가 */}
                            <div className={styles.mateManageCircle}>
                               <img className={styles.img} src={mate} alt="Mate icon" />
                            </div>
                            <div className={styles.mateManageIcon}>
                                메이트 관리
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}></div>

                    <div className={styles.content}>
                        <p className={styles.createMateText}>여행을 만들고 메이트와 함께<br />여행을 떠나봐요!</p>
                        
                        <button className={styles.createTripButton} onClick={mate_travel}>여행 만들기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Firstmatepage;