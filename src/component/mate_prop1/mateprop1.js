import React, { useState } from "react";
import styles from "./mateprop.module.css";
import { useSwipeable } from 'react-swipeable';

function Mateprop1() {
    const [index1, setIndex1] = useState(0);

    const handleSwipedLeft1 = () => {
        setIndex1((prevIndex) => (prevIndex + 1) % 4); 
    };

    const handleSwipedRight1 = () => {
        setIndex1((prevIndex) => (prevIndex - 1 + 4) % 4); 
    };

    const handlers1 = useSwipeable({
        onSwipedLeft: handleSwipedLeft1,
        onSwipedRight: handleSwipedRight1,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const slides = [
        { name: "민지님", location: "도쿄", percentage: 85 },
        { name: "철수님", location: "오사카", percentage: 75 },
        { name: "영희님", location: "교토", percentage: 90 },
        { name: "길동님", location: "나고야", percentage: 80 },
    ];

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <div className={styles.mainbox}>
                    <div className={styles.Crebackbuttons}></div>
                    <h1 className={styles.title}>여행 생성</h1>
                    <p className={styles.subtitle}>함께 여행하고 싶은 메이트를 찾아 여행을 제안해요!</p>
                    
                    <div {...handlers1} className={styles.rcslider}>
                        <div 
                            className={styles.rcslidercontainer} 
                            style={{ transform: `translateX(-${index1 * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div key={index} className={styles.rcslideritem}>
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

                    <button className={styles.prevButton}>이전</button>
                    <button className={styles.nextButton}>제안하기</button>
                </div>
            </div>
        </div>
    );
}

export default Mateprop1;