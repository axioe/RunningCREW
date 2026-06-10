import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="nature-runner-main-wrapper">
      {/* GNB 영역 */}
      <header className="main-gnb-header">
        <div className="logo-area" onClick={() => navigate("/")}>
          <span className="logo-green-text">Nature</span> Runner
        </div>
        <nav className="nav-menu-bar">
          <button className="menu-btn active" onClick={() => navigate("/")}>홈</button>
          <button className="menu-btn" onClick={() => navigate("/search")}>러닝 코스</button>
          <button className="menu-btn" onClick={() => navigate("/search")}>크루 모집</button>
          <button className="menu-btn" onClick={() => navigate("/mypage")}>마이페이지</button>
        </nav>
        <div className="user-actions-area">
          <button className="gnb-login-btn" onClick={() => navigate("/login")}>로그인</button>
        </div>
      </header>

      {/* 중앙 메인 배너 및 검색 섹션 */}
      <section className="main-hero-banner">
        <div className="hero-center-content">
          <h2>자연을 품은 러닝, Nature Runner와 함께하세요</h2>
          <p>내 주변의 안전하고 쾌적한 러닝 코스와 크루를 탐색해 보세요.</p>
          <div className="main-page-search-bar">
            <input 
              type="text" 
              placeholder="코스명이나 지역명을 입력해 보세요." 
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/search");
              }}
            />
            <button onClick={() => navigate("/search")}>
              검색
            </button>
          </div>
        </div>
      </section>

      {/* 대시보드 3단 레이아웃 콘텐츠 */}
      <main className="main-dashboard-grid">
        {/* 1단: 내 크루 현황 */}
        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>내 크루 현황</h3>
            <button onClick={() => navigate("/mypage")} className="card-more-link">관리</button>
          </div>
          <div className="card-widget-body">
            <div className="card-empty-msg">현재 참여 중인 러닝 크루가 없습니다.</div>
          </div>
        </article>

        {/* 2단: 추천 크루 모집 */}
        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>추천 크루 모집</h3>
            <button onClick={() => navigate("/search")} className="card-more-link">더보기</button>
          </div>
          <div className="card-widget-body">
            <div className="main-crew-card-item">
              <div className="crew-level-tag">초급</div>
              <div className="crew-text-summary">
                <h4>[서울] 여의도 한강 저녁 힐링 러닝</h4>
                <p>매주 수요일 저녁 8시 • 5km 이내</p>
              </div>
            </div>
          </div>
        </article>

        {/* 3단: 날씨 및 기상 정보 */}
        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>오늘의 기상 정보</h3>
          </div>
          <div className="card-widget-body">
            <div className="main-weather-box">
              <div className="weather-large-icon">☀️</div>
              <div className="weather-info-text">
                <span className="temp-number">24°C</span>
                <span className="temp-status-desc">러닝하기 좋은 맑은 날씨</span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default MainPage;