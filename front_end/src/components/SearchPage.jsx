import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SearchPage.css";

const SearchPage = () => {
  const navigate = useNavigate();

  // 상세 필터 조작용 컴포넌트 상태 정의
  const [distance, setDistance] = useState(10); 
  const [difficulty, setDifficulty] = useState("전체"); // 기본값을 '전체'로 설정

  const handleApplyFilter = () => {
    alert(`[필터 적용 기능 작동]\n설정된 거리: ${distance}km\n선택된 난이도: ${difficulty}\n\n추후 백엔드 및 DB 데이터와 매핑하여 필터링 검색을 수행합니다.`);
  };

  return (
    <div className="search-page-container">
      {/* 1. 상단 네비게이션 바 */}
      <header className="search-gnb">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-green">Nature</span> Runner
        </div>
        <nav className="nav-menu">
          <button onClick={() => navigate("/")}>홈</button>
          <button className="active" onClick={() => navigate("/search")}>러닝 코스</button>
          <button onClick={() => navigate("/search")}>크루 모집</button>
          <button onClick={() => navigate("/mypage")}>마이페이지</button>
        </nav>
        <div className="user-actions">
          <i className="fa-regular fa-bell icon"></i>
          <i className="fa-regular fa-user icon"></i>
          <button className="login-btn" onClick={() => navigate("/login")}>로그인</button>
        </div>
      </header>

      {/* 2. 검색 필터 헤더 섹션 */}
      <section className="search-header-section">
        <h1>러닝 코스 및 크루 검색</h1>
        <div className="search-input-wrapper">
          <input type="text" placeholder="원하시는 지역이나 장소명을 입력하세요." />
          <button className="search-submit-btn">
            <i className="fa-solid fa-magnifying-glass"></i> 검색
          </button>
        </div>
      </section>

      {/* 3. 레이아웃 본문 */}
      <main className="search-main-content">
        
        {/* 좌측 사이드바: 상세 필터 제어 영역 */}
        <aside className="filter-sidebar">
          <h3>상세 필터</h3>
          
          {/* 지역 선택 콤보박스 */}
          <div className="filter-group">
            <label>지역 선택</label>
            <select className="filter-select">
              <option>지역을 선택해주세요</option>
              <option>서울특별시</option>
              <option>경기도</option>
            </select>
          </div>

          {/* 거리 제어 컴포넌트 */}
          <div className="filter-group">
            <label>거리 (선택: {distance}km)</label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="1" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              <span>1km</span>
              <span>20km</span>
            </div>
          </div>

          {/* 난이도 설정 (디자인 필터 버튼으로 개편) */}
          <div className="filter-group">
            <label>난이도</label>
            <div className="difficulty-btn-group">
              <button 
                className={`diff-btn all-btn ${difficulty === "전체" ? "active" : ""}`}
                onClick={() => setDifficulty("전체")}
              >
                전체
              </button>
              <button 
                className={`diff-btn beginner-btn ${difficulty === "초급" ? "active" : ""}`}
                onClick={() => setDifficulty("초급")}
              >
                초급
              </button>
              <button 
                className={`diff-btn intermediate-btn ${difficulty === "중급" ? "active" : ""}`}
                onClick={() => setDifficulty("중급")}
              >
                중급
              </button>
              <button 
                className={`diff-btn advanced-btn ${difficulty === "고급" ? "active" : ""}`}
                onClick={() => setDifficulty("고급")}
              >
                고급
              </button>
            </div>
          </div>

          {/* 코스 유형 */}
          <div className="filter-group">
            <label>코스 유형</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> 평지 코스</label>
              <label><input type="checkbox" /> 산책 코스</label>
              <label><input type="checkbox" /> 오르막 코스</label>
            </div>
          </div>

          {/* 기타 옵션 */}
          <div className="filter-group">
            <label>기타 옵션</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> 주차 가능 여부</label>
              <label><input type="checkbox" /> 음용수대 보유</label>
            </div>
          </div>

          {/* 필터 적용 제어 버튼 */}
          <button className="apply-filter-btn" onClick={handleApplyFilter}>
            필터 적용
          </button>
        </aside>

        {/* 우측 콘텐츠 영역 */}
        <section className="results-container">
          
          {/* 분류 탭 메뉴바 */}
          <div className="tab-menu">
            <button className="active">전체</button>
            <button>러닝 코스</button>
            <button>러닝 크루</button>
            <button>공공체육시설</button>
          </div>

          {/* 내부 리스트 및 지도 스플릿 레이아웃 */}
          <div className="content-grid">
            
            {/* 결과 리스트 컴포넌트 스택 */}
            <div className="left-results">
              
              {/* 추천 러닝 코스 파트 */}
              <div className="result-section">
                <div className="section-header">
                  <h4>추천 러닝 코스</h4>
                  <button className="more-btn">
                    더보기 <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <div className="card-list">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="course-card">
                      <div className="card-img-placeholder">Nature Route Mock Image</div>
                      <div className="card-info">
                        <h5>공원 산책 러닝 코스 {idx}</h5>
                        <p>근처 지정 장소 기반 • {3 + idx}km</p>
                        <button className="detail-btn">상세보기</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 러닝 크루 모집 파트 */}
              <div className="result-section">
                <div className="section-header">
                  <h4>러닝 크루 모집 게시글</h4>
                  <button className="more-btn">
                    더보기 <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <div className="card-list">
                  {[1, 2].map((idx) => (
                    <div key={idx} className="crew-card">
                      <div className="card-img-placeholder">Nature Crew Mock Image</div>
                      <div className="card-info">
                        <h5>스피드 런 크루 모집 모듈 {idx}</h5>
                        <p>정원 15명 제한 • 주말 오전 세션</p>
                        <button className="join-btn">참여하기</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 지도 및 인프라 구역 */}
            <div className="right-map-area">
              
              {/* 임시 지도 대체 컨테이너 */}
              <div className="map-placeholder">
                <p>Kakao / Google Map API 연동 공간</p>
                <div className="map-mock-marker">📍</div>
              </div>

              {/* 주변 공공체육시설 파트 */}
              <div className="facility-section">
                <div className="section-header">
                  <h4>주변 공공체육시설</h4>
                  <button className="more-btn" onClick={() => navigate("/public-facilities")}>
                    더보기
                  </button>
                </div>
                <div className="facility-list">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="facility-item">
                      <div className="facility-name-box">
                        <span className="facility-icon">🏛️</span>
                        <span className="facility-text">임시 지정 근처 공공체육관 {idx}호</span>
                      </div>
                      <button className="go-btn">
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SearchPage;