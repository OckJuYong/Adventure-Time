import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // 추가된 부분
import styles from "./firstemate.module.css";
import axios from 'axios';


import mate from  "./Vector.png"

import Footer from '../footer/footer';

function Firstmatepage() {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();  // 추가된 부분


    const [myMates, setMyMates] = useState([]);
    
    useEffect(() => {
        const fetchMyMates = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/friend-list', config);
                setMyMates(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching my mates:', error);
            }
        };

        fetchMyMates();
    }, []);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const mate_travel = () => {
        navigate("/nextpage");  // 여행 만들기 페이지로 이동
    }

    const manageMate = () => {
        navigate("/Managematepage");  // 메이트 관리 페이지로 이동
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
                        <div>
                            {myMates.length > 0 ? (
                                myMates.map((mate) => (
                                    <div key={mate.id}>
                                        <div></div>
                                        <div>
                                            <p>{mate.friendTravelUserDto.name}</p>
                                            <p>한국형 페르소나</p>
                                        </div>
                                    </div>
                                ))
                            ) : <p className={styles.noMateText}>메이트가 아직 없습니다.</p>}
                        </div>
                        
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
                <Footer />
            </div>
        </div>
    );
}

export default Firstmatepage;