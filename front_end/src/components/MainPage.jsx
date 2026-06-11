import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/MainPage.css";
import Header from "./common/Header";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="nature-runner-main-wrapper">
      
      <Header/>

      {/* 중앙 히어로 섹션 */}
      <section className="main-hero-banner">
        <div className="hero-center-content">
          <h2>자연을 품은 러닝, Nature Runner와 함께하세요</h2>
          <p>내 주변의 안전하고 쾌적한 러닝 코스와 크루를 탐색해 보세요.</p>
          
          {/* 메인 검색창 구조 */}
          <div className="main-page-search-bar">
            <input type="text" placeholder="코스명이나 지역명을 입력해 보세요" />
            
            {/* 🌟 연동 2: 중앙 초록색 [검색] 버튼 클릭 -> '독립된 SearchPage'로 이동 */}
            <button onClick={() => navigate("/search")}>
              검색
            </button>
          </div>
        </div>
      </section>

      {/* 3단 대시보드 그리드 레이아웃 배치 구역 */}
      <main className="main-dashboard-grid">
        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>내 크루 현황</h3>
            <button className="card-more-link" onClick={() => navigate("/mypage")}>관리</button>
          </div>
          <div className="card-widget-body">
            <span className="card-empty-msg">현재 참여 중인 러닝 크루가 없습니다.</span>
          </div>
        </article>

        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>추천 크루 모집</h3>
            <button className="card-more-link" onClick={() => navigate("/crew-recruitment")}>더보기</button>
          </div>
          <div className="card-widget-body" style={{ display: 'block' }}>
            <div className="main-crew-card-item">
              <span className="crew-level-tag">새싹</span>
              <div className="crew-text-summary">
                <h4>[서울] 여의도 한강 저녁 힐링 러닝</h4>
                <p>매주 수요일 저녁 8시 • 5km 이내</p>
              </div>
            </div>
          </div>
        </article>

        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>오늘의 기상 정보</h3>
          </div>
          <div className="card-widget-body">
            <div className="main-weather-box">
              <span className="weather-large-icon">🌞</span>
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