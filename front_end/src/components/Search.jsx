import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Search.css";
import Header from "./common/Header";

const Search = () => {
  const navigate = useNavigate();

  // 상세 필터 조작용 컴포넌트 상태 정의
  const [distance, setDistance] = useState(10); 
  const [difficulty, setDifficulty] = useState("전체"); 

  const handleApplyFilter = () => {
    alert(`[필터 적용] 거리: ${distance}km / 난이도: ${difficulty}`);
  };

  return (
    <div className="search-page-container">
      <Header/>

      {/* 2. 검색 필터 헤더 섹션 */}
      <section className="search-header-section">
        <h1>러닝 코스 및 크루 검색</h1>
        <p>원하는 지역과 장소를 검색해보세요.</p>
        <div className="search-input-wrapper">
          <input type="text" placeholder="지역명 또는 장소명을 입력하세요" />
          <button className="search-submit-btn">
             검색
          </button>
        </div>
      </section>

      {/* 3. 레이아웃 본문 (3단 분할 구성) */}
      <main className="search-main-content">
        
        {/* [좌측] 상세 필터 레이어 */}
        <aside className="filter-sidebar">
          <div className="sidebar-title-box">
            <h3>상세 필터</h3>
            <button className="reset-btn" onClick={() => { setDistance(10); setDifficulty("전체"); }}>🔄 초기화</button>
          </div>
          
          <div className="filter-group">
            <label>지역 선택</label>
            <select className="filter-select">
              <option>서울특별시</option>
            </select>
            <select className="filter-select" style={{ marginTop: "8px" }}>
              <option>서울숲</option>
            </select>
          </div>

          <div className="filter-group">
            <label>거리</label>
            <input 
              type="range" min="1" max="20" step="1" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              <span>1km</span>
              <span>20km+</span>
            </div>
          </div>

          <div className="filter-group">
            <label>난이도</label>
            <div className="difficulty-btn-group">
              <button 
                className={`diff-btn beginner-btn ${difficulty === "새싹" ? "active" : ""}`}
                onClick={() => setDifficulty("새싹")}
              >
                새싹
              </button>
              <button 
                className={`diff-btn intermediate-btn ${difficulty === "나무" ? "active" : ""}`}
                onClick={() => setDifficulty("나무")}
              >
                나무
              </button>
              <button 
                className={`diff-btn advanced-btn ${difficulty === "숲" ? "active" : ""}`}
                onClick={() => setDifficulty("숲")}
              >
                숲
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>코스 유형</label>
            <div className="checkbox-grid-layout">
              <label><input type="checkbox" /> 순환 코스</label>
              <label><input type="checkbox" /> 왕복 코스</label>
              <label><input type="checkbox" /> 트레일 코스</label>
              <label><input type="checkbox" /> 공원 코스</label>
            </div>
          </div>

          <div className="filter-group">
            <label>기타 옵션</label>
            <div className="checkbox-grid-layout">
              <label><input type="checkbox" /> 화장실 있음</label>
              <label><input type="checkbox" /> 음용수대 있음</label>
              <label><input type="checkbox" /> 주차 가능</label>
            </div>
          </div>

          <button className="apply-filter-btn" onClick={handleApplyFilter}>
            필터 적용
          </button>
        </aside>

        {/* [중앙] 검색 결과 리스트 */}
        <section className="results-container">
          <div className="tab-menu">
            <button className="active">전체</button>
            <button onClick={() => navigate("/course")}>러닝 코스</button>
            <button onClick={() => navigate("/")}>러닝 크루</button>
            <button>공공체육시설</button>
          </div>

          <div className="result-section">
            <div className="section-header">
              <h4>'서울숲' 검색 결과 <span className="total-count">총 24건</span></h4>
            </div>
            
            <div className="section-sub-title">
              <h5>📈 추천 러닝 코스</h5>
              <button 
                className="sp-more-redirect-btn" 
                onClick={() => navigate("/course-recommendation")}
              >
                더보기 <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div className="card-list">
              <div className="course-card">
                <div className="card-img-placeholder main-road-1"></div>
                <div className="card-info">
                  <h5>서울숲 러닝코스</h5>
                  <p>📍 서울 성동구 서울숲길</p>
                  <p>5.2km • 약 32분 <span className="badge amber">중</span></p>
                  <button className="detail-btn" onClick={() => navigate("/course-recommendation")}>상세보기</button>
                </div>
              </div>
              <div className="course-card">
                <div className="card-img-placeholder main-road-2"></div>
                <div className="card-info">
                  <h5>한강 뚝섬 코스</h5>
                  <p>📍 서울 성동구 뚝섬한강공원</p>
                  <p>7.8km • 약 48분 <span className="badge green">하</span></p>
                  <button className="detail-btn" onClick={() => navigate("/course-recommendation")}>상세보기</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* [우측] 기획안 구조 반영: 우측 독립 블록 형식으로 배치된 지도 영역 */}
        <aside className="right-map-block-area">
          <div className="map-api-placeholder-box">
            <i className="fa-solid fa-map-location-dot map-placeholder-icon"></i>
            <p>kakao/google.map api로 대체될 예정입니다</p>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default Search;