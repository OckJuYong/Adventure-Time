import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Potopagestyle from "./potoupload.module.css";
import infoImg from './info.png';
import closeBtn from './closeBtn.png';

function Potouploadpage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [travelAnswers, setTravelAnswers] = useState(null);

  const [mbti, setMbti] = useState('');
  const [visitedPlaces, setVisitedPlaces] = useState('');
  const [desiredPlaces, setDesiredPlaces] = useState('');

  useEffect(() => {
    const answers = location.state?.travelAnswers;
    if (answers) {
      setTravelAnswers(answers);
      console.log("Received Travel Answers:", answers);
    }
  }, [location]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files].slice(0, 12));
    setShowWarning(false);
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNextPage = () => {
    if (selectedImages.length >= 1 && mbti && visitedPlaces && desiredPlaces) {
      navigate('/UploadWait', { 
        state: { 
          selectedImages: selectedImages,
          travelAnswers: travelAnswers,
          mbti: mbti,
          visitedPlaces: visitedPlaces,
          desiredPlaces: desiredPlaces
        } 
      });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className={Potopagestyle.container}>
            <input
        type="text"
        value={mbti}
        onChange={(e) => setMbti(e.target.value)}
        placeholder="MBTI를 입력하세요"
        className={Potopagestyle.input}
      />
      <input
        type="text"
        value={visitedPlaces}
        onChange={(e) => setVisitedPlaces(e.target.value)}
        placeholder="방문한 장소를 입력하세요"
        className={Potopagestyle.input}
      />
      <input
        type="text"
        value={desiredPlaces}
        onChange={(e) => setDesiredPlaces(e.target.value)}
        placeholder="가고 싶은 장소를 입력하세요"
        className={Potopagestyle.input}
      />
      <img src={infoImg} className={Potopagestyle.infoImg} onClick={toggleModal} alt="Info"/>
      <h1 className={Potopagestyle.title1}>좋아하는 여행 사진을</h1>
      <h1 className={Potopagestyle.title2}>선택해 주세요!</h1>
      <p className={Potopagestyle.subtitle}>선택한 사진을 분석해 재진님의 여행 페르소나를 생성합니다.</p>
      
      <div className={Potopagestyle.imageGrid} onClick={handleImageBoxClick}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={Potopagestyle.imageBox}>
            {selectedImages[index] ? (
              <>
                <img
                  src={URL.createObjectURL(selectedImages[index])}
                  alt={`Selected ${index + 1}`}
                  className={Potopagestyle.image}
                />
                <div className={Potopagestyle.checkCircle}>
                  <div className={Potopagestyle.checkMark}></div>
                </div>
              </>
            ) : (
              <div className={Potopagestyle.emptyCircle}></div>
            )}
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        className={Potopagestyle.fileInput}
      />
      <button onClick={handleNextPage} className={Potopagestyle.selectButton}>
        {selectedImages.length >= 1 ? "페르소나 생성하기" : `${selectedImages.length}개 선택 완료`}
      </button>

      {showWarning && (
        <p className={Potopagestyle.warningMessage}>
          아직 사진을 10장 업로드하지 못했습니다.
        </p>
      )}

      {isModalOpen && (
        <div className={Potopagestyle.modalOverlay} onClick={toggleModal}>
          <div className={Potopagestyle.modalContent} onClick={e => e.stopPropagation()}>
            <img src={closeBtn} onClick={toggleModal} className={Potopagestyle.close_modal}/>
            <p className={Potopagestyle.tip}>사진 선택 tip</p>
            <h2>본인을 잘 나타낼 수 있는 사진을 고르세요</h2>
            <p>페르소나 생성 이미지 분석은 사진에 드러나는 요소들을 분석해 사용자의 페르소나를 생성합니다.</p>
            <h2>중복되는 사진은 최대한 피해주세요.</h2>
            <p>비슷한 사진을 중복해서 선택하면 적절한 사용자 페르소나 생성이 어려울 수 있습니다.</p>
            <h2>10장 이상의 사진을 선택합니다.</h2>
            <p>적절한 분석을 위해 10장 이상의 사진 선택을 요구합니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Potouploadpage;