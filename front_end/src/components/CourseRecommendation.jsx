import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CourseRecommendation.css";
import Header from "./common/Header";

const CourseRecommendation = () => {
  const navigate = useNavigate();

  // 상세 필터 조작용 컴포넌트 상태 정의
  const [distance, setDistance] = useState(10); 
  const [difficulty, setDifficulty] = useState("전체");
  const [sortType, setSortType] = useState("최신순");
  
  const [courseTypes, setCourseTypes] = useState({
    facility: false,
    standard: false
  });

  const handleResetFilter = () => {
    setDistance(10);
    setDifficulty("전체");
    setCourseTypes({ facility: false, standard: false });
  };

  const mockCourses = [
    {
      id: 1,
      title: "서울숲 러닝 코스",
      address: "서울 성동구 뚝섬로 273",
      desc: "서울숲을 따라 펼쳐진 나무 그늘길과 산책로 코스",
      distance: "5.2 km",
      time: "40 분",
      level: "하",
      levelClass: "lv-low",
      tag: "공공시설",
      rating: "4.8",
      reviewCount: 124,
      img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600"
    },
    {
      id: 2,
      title: "여의도 한강공원 코스",
      address: "서울 영등포구 여의동로 330",
      desc: "한강을 따라 시원하게 달릴 수 있는 인기 코스",
      distance: "10.3 km",
      time: "80 분",
      level: "중",
      levelClass: "lv-mid",
      tag: "기존 장소",
      rating: "4.7",
      reviewCount: 98,
      img: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600"
    },
    {
      id: 3,
      title: "반포 한강공원 코스",
      address: "서울 서초구 신반포로 11",
      desc: "반포대교 야경과 함께 달리는 낭만적인 코스",
      distance: "7.2 km",
      time: "55 분",
      level: "중",
      levelClass: "lv-mid",
      tag: "공공시설",
      rating: "4.6",
      reviewCount: 86,
      img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600"
    },
    {
      id: 4,
      title: "올림픽공원 코스",
      address: "서울 송파구 올림픽로 424",
      desc: "넓은 공원과 다양한 코스를 즐길 수 있는 코스",
      distance: "8.6 km",
      time: "65 분",
      level: "상",
      levelClass: "lv-high",
      tag: "공공시설",
      rating: "4.9",
      reviewCount: 112,
      img: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=600"
    }
  ];

  return (
    <div className="cr-page-global-container">
      
      <Header/>

      {/* 상단 그린 배너 */}
      <section className="cr-hero-illustration-banner">
        <div className="cr-banner-text-wrap">
          <h1>러닝 코스 추천</h1>
          <p>지도와 공공체육시설 정보를 기반으로 최적의 러닝 코스를 추천해드려요.</p>
        </div>
      </section>

      {/* 대시보드 레이아웃 본문 */}
      <main className="cr-main-split-layout">
        
        {/* [좌측 구역] 상세 필터 사이드바 */}
        <aside className="cr-filter-sidebar-wrapper">
          <div className="cr-sidebar-header-box">
            <h4><i className="fa-solid fa-magnifying-glass"></i> 검색 및 필터</h4>
          </div>

          <div className="cr-sidebar-form-group">
            <label>지역 검색</label>
            <select className="cr-form-combo-box">
              <option>서울특별시</option>
            </select>
            <select className="cr-form-combo-box" style={{ marginTop: "8px" }}>
              <option>전체 지역</option>
            </select>
          </div>

          <div className="cr-sidebar-form-group">
            <label>거리 (선택: {distance}km 이내)</label>
            <input 
              type="range" min="1" max="20" step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="cr-range-slider-bar"
            />
            <div className="cr-range-slider-indicators">
              <span>1km</span>
              <span>20km+</span>
            </div>
          </div>

          <div className="cr-sidebar-form-group">
            <label>난이도</label>
            <div className="cr-difficulty-button-cluster">
              {["전체", "새싹", "나무", "숲"].map((lvl) => (
                <button
                  key={lvl}
                  className={`cr-level-btn ${difficulty === lvl ? "active" : ""}`}
                  onClick={() => setDifficulty(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="cr-sidebar-form-group">
            <label>코스 유형</label>
            <div className="cr-checkbox-stack">
              <label>
                <input 
                  type="checkbox" 
                  checked={courseTypes.facility}
                  onChange={(e) => setCourseTypes({ ...courseTypes, facility: e.target.checked })}
                /> 
                공공체육시설
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={courseTypes.standard}
                  onChange={(e) => setCourseTypes({ ...courseTypes, standard: e.target.checked })}
                /> 
                기존 러닝 장소
              </label>
            </div>
          </div>

          <button className="cr-filter-reset-action-btn" onClick={handleResetFilter}>
            <i className="fa-solid fa-rotate-right"></i> 필터 초기화
          </button>
        </aside>

        {/* [중앙 구역] 코스 추천 리스트 */}
        <section className="cr-center-cards-scroll-container">
          <div className="cr-list-top-meta-bar">
            <span className="cr-total-count-label">전체 <strong className="count-num">24</strong>개의 코스</span>
            
            <select 
              className="cr-sort-dropdown-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="최신순">최신순</option>
              <option value="거리순">거리순</option>
            </select>
          </div>

          <div className="cr-cards-vertical-stack">
            {mockCourses.map((course) => (
              <div key={course.id} className="cr-item-row-card">
                <div className="cr-card-thumbnail-area" style={{ backgroundImage: `url(${course.img})` }}>
                  <span className={`cr-card-inline-tag ${course.tag === "공공시설" ? "tag-facility" : "tag-place"}`}>
                    {course.tag}
                  </span>
                </div>
                <div className="cr-card-main-details">
                  <div className="cr-card-title-line">
                    <h5>{course.title}</h5>
                    <div className="cr-card-rating-box">
                      <span className="star-icon">★</span>
                      <span className="score-text">{course.rating}</span>
                      <span className="count-text">({course.reviewCount})</span>
                      <i className="fa-regular fa-bookmark cr-bookmark-icon"></i>
                    </div>
                  </div>
                  <p className="cr-info-location-text"><i className="fa-solid fa-location-dot"></i> {course.address}</p>
                  <p className="cr-info-body-desc">{course.desc}</p>
                  
                  <div className="cr-card-bottom-flex-bar">
                    <div className="cr-meta-spec-badges">
                      <span><i className="fa-solid fa-person-running"></i> {course.distance}</span>
                      <span><i className="fa-regular fa-clock"></i> {course.time}</span>
                      <span className={`cr-badge-level-indicator ${course.levelClass}`}>{course.level}</span>
                    </div>
                    <button className="cr-view-detail-action-btn">코스 상세 보기</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cr-pagination-nav-bar">
            <button className="arrow-btn">&lt;</button>
            <button className="page-num-btn active">1</button>
            <button className="page-num-btn">2</button>
            <button className="page-num-btn">3</button>
            <button className="arrow-btn">&gt;</button>
          </div>
        </section>

        {/* [우측 구역] 기획안 이미지 완벽 매핑: 우측 독립 블록 형식의 지도 및 안내 판넬 */}
        <section className="cr-right-map-infrastructure-zone">
          <div className="cr-map-api-frame-holder">
            <div className="cr-map-api-placeholder-box-v2">
              <i className="fa-solid fa-map-location-dot map-placeholder-icon-v2"></i>
              <p>kakao/google.map api로 대체될 예정입니다</p>
            </div>
          </div>

          <article className="cr-public-facilities-info-board">
            <div className="cr-board-header">
              <h5><i className="fa-solid fa-circle-info"></i> 공공체육시설 정보 안내</h5>
              <p>본 정보는 문화체육관광부 공공체육시설 API 데이터를 기반으로 제공합니다.</p>
            </div>
            <button 
              className="cr-board-redirect-action-link" 
              onClick={() => navigate("/public-facilities")}
            >
              공공체육시설 더 알아보기 <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </article>
        </section>

      </main>
    </div>
  );
};

export default CourseRecommendation;