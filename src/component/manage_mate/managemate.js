import React from "react";
import styles from "./managemate.module.css";

function Managemate() {
    return (
        <div className={styles.mainbox}>
            <header className={styles.header}>
                <button className={styles.backButton}>{'<'}</button>
                <h1 className={styles.title}>메이트 관리</h1>
            </header>
            
            <nav className={styles.tabNav}>
                <button className={`${styles.tabButton} ${styles.active}`}>내 메이트</button>
                <button className={styles.tabButton}>받은 요청</button>
                <button className={styles.tabButton}>보낸 요청<span className={styles.dot}></span></button>
            </nav>
            
            <div className={styles.content}>
                <p className={styles.count}>내 메이트 0명</p>
                <button className={styles.editButton}>편집</button>
                <p className={styles.noMateMessage}>내 메이트가 아직 없습니다.</p>
            </div>
            
            <footer className={styles.footer}>
                <button className={styles.footerButton}>
                    <i className={styles.parkingIcon}></i>
                    <span>패트스냅</span>
                </button>
                <button className={`${styles.footerButton} ${styles.active}`}>
                    <i className={styles.mateIcon}></i>
                    <span>메이트</span>
                </button>
                <button className={styles.footerButton}>
                    <i className={styles.travelIcon}></i>
                    <span>여행일기</span>
                </button>
            </footer>
        </div>
    );
}

export default Managemate;