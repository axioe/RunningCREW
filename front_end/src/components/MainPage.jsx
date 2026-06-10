import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  // 날씨 API 대용 임시 원천 데이터 레이어
  const mockWeather = {
    location: "서울특별시",
    temp: 24,
    condition: "맑음",
    humidity: 48,
    dust: "좋음",
    wind: "2.1m/s"
  };

  // 추천 크루 미니 데이터 레이어
  const mockRecommendCrews = [
    { id: 101, title: "한강 10K 함께 달려요!", location: "한강공원(뚝섬지구)", current: 8, max: 12 },
    { id: 102, title: "서울숲 5K 모닝 러닝", location: "서울숲 공원", current: 4, max: 10 }
  ];

  return (
    <div className="main-page-container">
      {/* 1. 상단 GNB 네비게이션 영역 */}
      <header className="main-page-header">
        <div className="main-page-logo" onClick={() => navigate('/')}>
          🏃 Running Crew
        </div>
        <nav className="main-page-nav">
          <span className="main-page-nav-item" onClick={() => navigate('/running-course')}>러닝 코스</span>
          <span className="main-page-nav-item" onClick={() => navigate('/crew-recruitment')}>크루 모집</span>
          <span className="main-page-nav-item" onClick={() => navigate('/my-page')}>마이페이지</span>
          <button className="main-page-login-btn" onClick={() => navigate('/login')}>로그인</button>
        </nav>
      </header>

      {/* 2. 중앙 히어로 검색 섹션 */}
      <section className="main-page-hero">
        <h1 className="main-page-hero-title">오늘, 어디서 달릴까요?</h1>
        <p className="main-page-hero-subtitle">함께 달릴 크루를 찾고, 최고의 코스를 만나보세요!</p>
        
        {/* 검색 인프라 클릭 시 크루 모집 페이지로 바인딩 */}
        <div className="main-page-search-wrap" onClick={() => navigate('/crew-recruitment')}>
          <div className="main-page-search-placeholder">지역, 장소명 또는 코스를 검색해 보세요</div>
          <button className="main-page-search-icon">🔍</button>
        </div>

        <div className="main-page-quick-tags">
          <span className="main-page-tag-label">📍 인기 지역</span>
          <span className="main-page-tag-item">여의도 한강공원</span>
          <span className="main-page-tag-item">서울숲</span>
          <span className="main-page-tag-item">올림픽공원</span>
        </div>
      </section>

      {/* 3. 3단 레이아웃 대시보드 메인 그리드 */}
      <main className="main-page-grid-layout">
        
        {/* [왼쪽 블럭] 내 크루 현황 섹션 */}
        <section className="main-page-block-card">
          <div className="main-page-block-header">
            <h2 className="main-page-block-title">📂 내 크루 현황</h2>
            <button className="main-page-more-btn" onClick={() => navigate('/crew-recruitment')}>더보기 〉</button>
          </div>
          
          <div className="main-page-login-box">
            <p className="main-page-login-box-title">로그인하고 내 크루를 확인하세요!</p>
            <p>로그인하시면 신청한 크루 목록을 한눈에 확인할 수 있어요.</p>
            <button className="main-page-inline-login-btn" onClick={() => navigate('/login')}>로그인하기</button>
          </div>

          <h3 className="main-page-sub-title">👥 현재 모집중인 크루</h3>
          <div className="main-page-side-crew-list">
            <div className="main-page-side-crew">
              <div className="main-page-side-crew-info">
                <span className="main-page-side-crew-name">여의도 한강 야간 러닝</span>
                <span className="main-page-side-crew-meta">난이도 중</span>
              </div>
              <span className="main-page-side-crew-count">5 / 10명</span>
            </div>
          </div>

          <button className="main-page-footer-btn" onClick={() => navigate('/crew-recruitment')}>
            더 많은 크루 보기 〉
          </button>
        </section>

        {/* [중앙 블럭] 추천 크루 모집 섹션 */}
        <section className="main-page-block-card">
          <div className="main-page-block-header">
            <h2 className="main-page-block-title">⭐ 추천 크루 모집</h2>
            <button className="main-page-more-btn" onClick={() => navigate('/crew-recruitment')}>더보기 〉</button>
          </div>

          {mockRecommendCrews.map((crew) => (
            <div key={crew.id} className="main-page-recommend-card" onClick={() => navigate(`/crew-recruitment/post/${crew.id}`)}>
              <div className="main-page-crew-thumb"></div>
              <div className="main-page-crew-body">
                <span className="main-page-badge-rec">추천</span>
                <span className="main-page-crew-title">{crew.title}</span>
                <span className="main-page-crew-loc">📍 {crew.location}</span>
              </div>
              <div className="main-page-crew-right">
                <span className="main-page-member-count">{crew.current}/{crew.max}명</span>
                <button className="main-page-join-btn" onClick={(e) => {
                  e.stopPropagation(); // 중복 라우팅 버블링 차단
                  navigate(`/crew-recruitment/post/${crew.id}`);
                }}>참가하기</button>
              </div>
            </div>
          ))}

          <button className="main-page-footer-btn" onClick={() => navigate('/crew-recruitment')}>
            전체 크루 모집 보러가기 〉
          </button>
        </section>

        {/* [오른쪽 블럭] 날씨 및 재난 정보 섹션 */}
        <section className="main-page-block-card">
          <div className="main-page-block-header">
            <h2 className="main-page-block-title">☁️ 날씨 및 재난 정보</h2>
            <button className="main-page-more-btn" onClick={() => navigate('/weather-disaster')}>더보기 〉</button>
          </div>

          <div className="main-page-weather-widget">
            <div className="main-page-weather-loc">📍 {mockWeather.location}</div>
            <div className="main-page-weather-row">
              <span style={{fontSize: '32px'}}>☀️</span>
              <div>
                <div className="main-page-weather-temp">{mockWeather.temp}°C</div>
                <div className="main-page-weather-cond">{mockWeather.condition} (체감 23°C)</div>
              </div>
            </div>
            <div className="main-page-weather-stats">
              <span>습도 {mockWeather.humidity}%</span>
              <span>미세먼지 {mockWeather.dust}</span>
              <span>바람 {mockWeather.wind}</span>
            </div>
          </div>

          <div className="main-page-disaster-box">
            <h3 className="main-page-sub-title">재난 및 안전 정보</h3>
            <div className="main-page-disaster-row" onClick={() => navigate('/weather-disaster')}>
              <span>📢 현재 특이사항 없음</span>
              <span style={{color: '#9CA3AF'}}>〉</span>
            </div>
          </div>
          
          <button className="main-page-footer-btn" style={{marginTop: '12px'}} onClick={() => navigate('/weather-disaster')}>
            지역별 재난 정보 더보기 〉
          </button>
        </section>

      </main>
    </div>
  );
};

export default MainPage;