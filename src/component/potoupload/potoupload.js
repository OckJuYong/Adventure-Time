import React, { useRef, useState } from "react";
import Potopagestyle from "./potoupload.module.css";

function Potouploadpage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files].slice(0, 12));
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={Potopagestyle.container}>
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
      <label className={Potopagestyle.selectButton}>
        {selectedImages.length >= 15 ? "15개 선택 완료" : `${selectedImages.length}개 선택 완료`}
      </label>
    </div>
  );
}

export default Potouploadpage;