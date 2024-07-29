import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./managemate.module.css";

// 내 메이트 컴포넌트
function MyMates({ selectedMate }) {
    return (
        <div className={styles.content}>
            <p className={styles.count}>내 메이트 {selectedMate ? 1 : 0}명</p>
            <button className={styles.editButton}>편집</button>
            {selectedMate ? (
                <div className={styles.selectedMateInfo}>
                    <h2>{selectedMate.name}</h2>
                    <p>위치: {selectedMate.location}</p>
                    <p>궁합: {selectedMate.percentage}%</p>
                </div>
            ) : (
                <p className={styles.noMateMessage}>내 메이트가 아직 없습니다.</p>
            )}
        </div>
    );
}

// 받은 요청 컴포넌트
function ReceivedRequests() {
    const [receivedRequests, setReceivedRequests] = useState([]);

    useEffect(() => {
        const fetchReceivedRequests = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/standby-list', config);
                setReceivedRequests(response.data);
            } catch (error) {
                console.error('Error fetching received requests:', error);
            }
        };

        fetchReceivedRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            const myUserId = localStorage.getItem('memberId');
            const response = await axios.patch('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/acceptance', {
                friendTravelUserId: requestId
            }, {
                headers: {
                    'Cookie': `jwtToken=${localStorage.getItem('jwtToken')}; jwtRefreshToken=${localStorage.getItem('jwtRefreshToken')}`
                }
            });

            console.log(`Request ${requestId} accepted`, response.data);
            // 수락 후 리스트를 업데이트
            setReceivedRequests(receivedRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const myUserId = localStorage.getItem('memberId');
            const response = await axios.patch('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/refusal', {
                friendTravelUserId: requestId
            }, {
                headers: {
                    'Cookie': `jwtToken=${localStorage.getItem('jwtToken')}; jwtRefreshToken=${localStorage.getItem('jwtRefreshToken')}`
                }
            });

            console.log(`Request ${requestId} rejected`, response.data);
            // 거절 후 리스트를 업데이트
            setReceivedRequests(receivedRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className={styles.content}>
            <p className={styles.count}>받은 요청 {receivedRequests.length}개</p>
            {receivedRequests.length > 0 ? (
                <ul>
                    {receivedRequests.map((request, index) => (
                        <li key={index} className={styles.requestItem}>
                            <p>이름: {request.name}</p>
                            <p>위치: {request.location}</p>
                            <p>궁합: {request.percentage}%</p>
                            <button onClick={() => handleAccept(request.id)}>수락</button>
                            <button onClick={() => handleReject(request.id)}>거절</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noMateMessage}>받은 요청이 없습니다.</p>
            )}
        </div>
    );
}

// 보낸 요청 컴포넌트
function SentRequests() {
    const [sentRequests, setSentRequests] = useState([]);

    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/request-list', config);
                setSentRequests(response.data);
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };

        fetchSentRequests();
    }, []);

    return (
        <div className={styles.content}>
            <p className={styles.count}>보낸 요청 {sentRequests.length}개</p>
            {sentRequests.length > 0 ? (
                <ul>
                    {sentRequests.map((request, index) => (
                        <li key={index} className={styles.requestItem}>
                            <p>이름: {request.name}</p>
                            <p>위치: {request.location}</p>
                            <p>궁합: {request.percentage}%</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noMateMessage}>보낸 요청이 없습니다.</p>
            )}
        </div>
    );
}

function Managemate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('myMates');
    const [selectedMate, setSelectedMate] = useState(null);

    useEffect(() => {
        if (location.state && location.state.selectedMate) {
            setSelectedMate(location.state.selectedMate);
        }
    }, [location]);

    const handleBack = () => {
        navigate(-1);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'myMates':
                return <MyMates selectedMate={selectedMate} />;
            case 'receivedRequests':
                return <ReceivedRequests />;
            case 'sentRequests':
                return <SentRequests />;
            default:
                return <MyMates selectedMate={selectedMate} />;
        }
    };

    return (
        <div className={styles.mainbox}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
                <h1 className={styles.title}>메이트 관리</h1>
            </header>
            
            <nav className={styles.tabNav}>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'myMates' ? styles.active : ''}`}
                    onClick={() => setActiveTab('myMates')}
                >
                    내 메이트
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'receivedRequests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('receivedRequests')}
                >
                    받은 요청
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'sentRequests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('sentRequests')}
                >
                    보낸 요청<span className={styles.dot}></span>
                </button>
            </nav>
            
            {renderContent()}
            
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
