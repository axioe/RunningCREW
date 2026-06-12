import React, { useState } from 'react';
import './style.css'; // 새로 업데이트된 style.css 임포트

const App = () => {
  const [isActive, setIsActive] = useState(false); // 애니메이션 토글용 상태

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      
      {/* 1. 우측 대시보드 영역 (기존 Sign Up 위치) */}
      <div className="form-container sign-up">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Crew Dashboard</h1>
          
          <div className="dashboard-card-widget">
            <div className="card-widget-header">
              <h3>추천 크루 모집</h3>
              <button type="button" className="card-more-link">더보기</button>
            </div>
            <div className="main-crew-card-item">
              <span className="crew-level-tag">초보 환영</span>
              <div className="crew-text-summary">
                <h4>반포 고수부지 거북이들</h4>
                <p>강남구 · 주 2회 진행</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card-widget">
            <div className="card-widget-header">
              <h3>오늘의 기상 정보</h3>
            </div>
            <div className="main-weather-box">
              <span className="weather-large-icon">☀️</span>
              <div className="weather-info-text">
                <span className="temp-number">24°C</span>
                <span className="temp-status-desc">러닝하기 아주 좋은 맑은 날씨</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 2. 좌측 메인 탐색 영역 (기존 Sign In 위치) */}
      <div className="form-container sign-in">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Running 탐색</h1>
          <p>원하는 코스나 지역을 검색해보세요.</p>
          
          <div className="main-page-search-bar">
            <input type="text" placeholder="코스, 지역 또는 크루명 검색..." />
            <button type="button">검색</button>
          </div>

          <div className="dashboard-card-widget">
            <div className="card-widget-header">
              <h3>실시간 인기 코스</h3>
              <button type="button" className="card-more-link">전체보기</button>
            </div>
            <div className="main-crew-card-item">
              <span className="crew-level-tag">난이도 하</span>
              <div className="crew-text-summary">
                <h4>여의도 한강 시민공원 코스</h4>
                <p>총 5.2km · 예상 35분</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 3. 중앙 토글 및 히어로 배너 결합 영역 */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>함께 달리는 즐거움,<br />Running Crew</h1>
            <p>다양한 추천 코스 정보를 한눈에 보고 싶다면 대시보드로 복귀하세요.</p>
            <button className="hidden" onClick={() => setIsActive(false)}>대시보드 보기</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>나만을 위한<br />맞춤형 러닝메이트</h1>
            <p>지금 내 주변의 최적화된 러닝 코스와 실시간 날씨 요약을 탐색해 보세요.</p>
            <button className="hidden" onClick={() => setIsActive(true)}>코스 검색하기</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;