import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/CourseDetail.css"; // 전용 CSS 로드
import Header from "./common/Header";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터로 코스 ID를 받아올 수 있습니다.

  // 임시 코스 상세 데이터 (DB 연동 전 가상 데이터)
  const courseInfo = {
    title: "서울숲 힐링 러닝코스",
    location: "서울 성동구 서울숲길 18",
    distance: "5.2km",
    duration: "약 32분",
    difficulty: "중",
    difficultyLevel: "amber", // amber(중), green(하), red(상)
    description: "도심 속 거대한 숲에서 즐기는 상쾌한 러닝! 완만한 경사와 풍부한 녹음 덕분에 초보자부터 숙련자까지 모두에게 사랑받는 코스입니다. 한강 연결로와 맞닿아 있어 확장 러닝도 가능합니다.",
    tags: ["공원 코스", "화장실 있음", "주차 가능"],
    imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600"
  };

  return (
    <div className="course-detail-global-wrapper">
      <Header />
      
      <div className="detail-container-inner">
        <div className="detail-main-card">
          
          {/* [좌측 패널] Login.jsx의 이미지를 활용한 코스 비주얼 영역 */}
          <div 
            className="detail-visual-panel" 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${courseInfo.imageUrl})` }}
          >
            <div className="visual-overlay-content">
              <span className={`detail-badge-pill ${courseInfo.difficultyLevel}`}>
                난이도 {courseInfo.difficulty}
              </span>
              <h2>{courseInfo.title}</h2>
              <p><i className="fa-solid fa-location-dot"></i> {courseInfo.location}</p>
            </div>
          </div>

          {/* [우측 영역] 코스 상세 정보 스펙 */}
          <div className="detail-info-area">
            <div className="info-content-scroll">
              <h3 className="info-section-title">코스 상세 정보</h3>
              
              <div className="spec-grid-container">
                <div className="spec-item">
                  <span className="spec-label">거리</span>
                  <span className="spec-value">{courseInfo.distance}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">소요 시간</span>
                  <span className="spec-value">{courseInfo.duration}</span>
                </div>
              </div>

              <div className="description-box">
                <h4>코스 설명</h4>
                <p>{courseInfo.description}</p>
              </div>

              <div className="tag-cloud">
                {courseInfo.tags.map((tag, index) => (
                  <span key={index} className="detail-tag">#{tag}</span>
                ))}
              </div>

              <div className="detail-action-buttons">
                <button className="btn-back-list" onClick={() => navigate(-1)}>
                  목록으로 돌아가기
                </button>
                <button className="btn-join-crew" onClick={() => alert("해당 코스 크루 모집 페이지로 이동합니다.")}>
                  크루 참여하기
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;