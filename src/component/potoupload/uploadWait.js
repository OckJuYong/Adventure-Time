import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UploadWait() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { imageUrls, travelAnswers } = location.state || {};

  useEffect(() => {
    console.log("Received Image URLs:", imageUrls);
    console.log("Received Travel Answers:", travelAnswers);

    // 여기서 이미지 업로드 및 분석 로직을 구현합니다.
    // 예시로 진행률을 증가시키는 코드를 작성했습니다.
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          // 분석이 완료되면 다음 페이지로 이동
          navigate('/potocompage', { state: { analysisResult: "예시 결과" } });
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [imageUrls, travelAnswers, navigate]);

  return (
    <div>
      <h1>이미지를 분석 중입니다...</h1>
      <span>{progress}%</span>
    </div>
  );
}

export default UploadWait;