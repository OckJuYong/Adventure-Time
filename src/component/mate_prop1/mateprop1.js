import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from "./mateprop.module.css";
import { useSwipeable } from 'react-swipeable';

function Mateprop1() {
    const [index1, setIndex1] = useState(0);
    const [slides, setSlides] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    headers: {
                        'jwtToken': jwtToken,
                        'jwtRefreshToken': jwtRefreshToken
                    }
                };

                const response = await axios.get(
                    'https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/recommend/test',
                    config
                );
                setSlides(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 401) {
                    console.log("Token expired or invalid. Redirecting to login...");
                    // navigate('/login');
                }
            }
        };

        fetchData();
    }, []);

    const handleSwipedLeft1 = () => {
        setIndex1((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handleSwipedRight1 = () => {
        setIndex1((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handlers1 = useSwipeable({
        onSwipedLeft: handleSwipedLeft1,
        onSwipedRight: handleSwipedRight1,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handlePrevious = () => {
        navigate(-1);
    };

    const handlePropose = async () => {
        const selectedSlide = slides[index1];
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

        const config = {
            headers: {
                'jwtToken': jwtToken,
                'jwtRefreshToken': jwtRefreshToken
            }
        };

        try {
            const response = await axios.post('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/additional', {
                friendTravelUserId: slides[selectedSlide.travelUserId - 1].travelUserId
            }, config);
            console.log('Propose response:', response.data);
            navigate("/Managematepage");
        } catch (error) {
            console.error('Error proposing:', error);
        }
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <div className={styles.mainbox}>
                    <div className={styles.Crebackbuttons} onClick={handlePrevious}></div>
                    <h1 className={styles.title}>여행 생성</h1>
                    <p className={styles.subtitle}>함께 여행하고 싶은 메이트를 찾아 여행을 제안해요!</p>
                    
                    <div {...handlers1} className={styles.rcslider}>
                        <div 
                            className={styles.rcslidercontainer} 
                            style={{ transform: `translateX(calc(-${index1 * 25}% - ${index1 * 2}%))` }}
                        >
                            {slides.map((slide, index) => (
                                <div 
                                    key={index} 
                                    className={`${styles.rcslideritem} ${index === index1 ? styles.active : ''}`}
                                >
                                    <div className={styles.percentageCircle}>
                                        <span className={styles.percentageLabel}>여행 궁합</span>
                                        <span className={styles.percentage}>{slide.percentage}%</span>
                                    </div>
                                    <div className={styles.characterImage}></div>
                                    <h2 className={styles.slideName}>{slide.name}</h2>
                                    <p className={styles.slideLocation}>{slide.location}</p>
                                    <div className={styles.barGraph}>
                                        <div className={styles.bar}></div>
                                        <div className={styles.bar}></div>
                                        <div className={styles.bar}></div>
                                        <div className={styles.bar}></div>
                                    </div>
                                    <div className={styles.labels}>
                                        <span className={styles.atext}>모험</span>
                                        <span className={styles.atext}>경험</span>
                                        <span className={styles.atext}>측후</span>
                                        <span className={styles.atext}>사교</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={styles.prevButton} onClick={handlePrevious}>이전</button>
                    <button className={styles.nextButton} onClick={handlePropose}>제안하기</button>
                </div>
            </div>
        </div>
    );
}

export default Mateprop1;
