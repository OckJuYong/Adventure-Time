import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UploadWait() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedImages, travelAnswers, mbti, visitedPlaces, desiredPlaces } = location.state || {};

  // FormData의 내용을 로깅하는 함수
  const logFormData = (formData) => {
    console.log("Sending the following data:");
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('picture')) {
        console.log(key, ": File -", value.name);
      } else {
        console.log(key, ":", value);
      }
    }
  };

  useEffect(() => {
    console.log("Received Images:", selectedImages);
    console.log("Received Travel Answers:", travelAnswers);
    console.log("MBTI:", mbti);
    console.log("Visited Places:", visitedPlaces);
    console.log("Desired Places:", desiredPlaces);

    const uploadImagesAndAnalyze = async () => {
      try {
        const formData = new FormData();
        
        // 이미지 파일 추가 (최대 10개까지)
        selectedImages.slice(0, 10).forEach((image, index) => {
          formData.append(`picture${index + 1}`, image);
        });
        
        // 여행 답변 추가 (최대 10개까지)
        travelAnswers.slice(0, 10).forEach((answer, index) => {
          formData.append(`question${index + 1}`, answer);
        });

        // 기타 정보 추가
        formData.append('mbti', mbti);
        formData.append('visited_places', visitedPlaces);
        formData.append('desired_places', desiredPlaces);

        // FormData 내용 로깅
        logFormData(formData);

        const jwtToken = localStorage.getItem('jwtToken');
        const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

        const config = {
          headers: {
              'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
          }
      };

        const response = await axios.post('http://43.202.121.14:8000/persona/create_user_info/', config, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        console.log("Server Response:", response.data);

        navigate('/potocompage', { state: { analysisResult: response.data } });
      } catch (error) {
        console.error("Error during image upload and analysis:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        // 에러 처리 로직
      }
    };

    if (selectedImages && selectedImages.length > 0 && travelAnswers && travelAnswers.length > 0 && mbti && visitedPlaces && desiredPlaces) {
      uploadImagesAndAnalyze();
    }
  }, [selectedImages, travelAnswers, mbti, visitedPlaces, desiredPlaces, navigate]);

  return (
    <div>
      <h1>페르소나를 생성 중입니다...</h1>
      <progress value={progress} max="100"></progress>
      <span>{progress}%</span>
    </div>
  );
}

export default UploadWait;