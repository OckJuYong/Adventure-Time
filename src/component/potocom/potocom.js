import React, { useState, useEffect } from "react"; 
import axios from "axios";
import potocomstyle from "./potocom.module.css";

function Potocom() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/reading', {
            withCredentials: true
          });
          setUserInfo(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
          setError("사용자 정보를 가져오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserInfo();
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러: {error}</div>;
    }

    return(
        <div className={potocomstyle.potocombox}>
            <p className={potocomstyle.title}>{userInfo?.name || 'OO'}님의 페르소나는?</p>
            <p className={potocomstyle.subtitle}>생성 완료!!</p>
            <p className={potocomstyle.inputbutton}>내 여행 페르소나</p>
        </div>
    )
}

export default Potocom;