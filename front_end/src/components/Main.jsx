import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import Header from "./common/Header";
import MainSafetyCard from "./common/MainSafetyCard";
import MainCrewCard from "./common/MainCrewCard";
import MainMyCrewCard from "./common/MainMyCrewCard";
import useAuthStore from "./common/useAuthStore";

const Main = () => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const token = useAuthStore((state) => state.accessToken);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // 디버깅용: 함수가 실행되는지 브라우저 콘솔(F12)에서 먼저 확인
    console.log("1. handleSearchSubmit 실행됨, 현재 입력값:", keyword);

    if (!keyword.trim()) {
      alert("검색어를 입력해주세요!"); // 동작 여부 확인용 알림
      return;
    }

    // 상태 변경 트리거
    setIsExpanded(true);
    console.log("2. isExpanded 상태를 true로 변경했습니다.");
  };

  function WeatherIcon({ icon }) {
    return (
      <img
        src={`/weather-icons/${icon}.svg`}
        alt={icon}
        width={120}
        height={120}
      />
    );
  }

  // 💡 안전한 클래스 결합 방식 적용 (공백 누락으로 인한 인식 불가 오류 원천 차단)
  const containerClasses = [
    "nature-runner-main-wrapper",
    isExpanded ? "expanded-mode" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <Header />

      {/* 중앙 히어로 섹션 */}
      <section className="main-hero-banner">
        <div className="hero-center-content">
          <h2>자연을 품은 러닝, Nature Runner와 함께하세요</h2>
          <p>내 주변의 안전하고 쾌적한 러닝 코스와 크루를 탐색해 보세요.</p>

          {/* 메인 검색창 구조 */}
          <form className="main-page-search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="코스명이나 지역명을 입력해 보세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">검색</button>
          </form>
        </div>
      </section>
{isExpanded && (
        <section className="main-search-result-section">
          <div className="result-section-header">
            <h3>'{keyword}' 검색 결과</h3>
          </div>
          
          <div className="result-section-body">
            {/* 데이터 패칭 중일 때 */}
            {isSearching && (
              <p className="search-status-msg">결과를 매칭하는 중입니다...</p>
            )}

            {/* 패칭이 끝났고 결과가 단 한 건도 없을 때 예외 처리 🌟 */}
            {!isSearching && searchResults.length === 0 && (
              <div className="search-empty-box">
                <p className="search-empty-msg">검색 결과가 없습니다.</p>
              </div>
            )}

            {/* 결과가 정상적으로 존재할 때 */}
            {!isSearching && searchResults.length > 0 && (
              <div className="search-result-grid">
                {searchResults.map((item) => (
                  <div key={item.id} className="search-result-card" onClick={() => navigate(`/course/${item.id}`)}>
                    <h4>{item.title}</h4>
                    <p>{item.description || item.content || "상세 정보가 없습니다."}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3단 대시보드 그리드 레이아웃 배치 구역 */}
      <main className="main-dashboard-grid">
        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>내 크루 현황</h3>
            {token &&(
              <button className="card-more-link" 
              onClick={() => navigate("/mypage")}
              >
                관리
              </button>
            )}
          </div>
          <div className="card-widget-body" style={{ display: "block" }}>
            <MainMyCrewCard />
          </div>
        </article>

        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>추천 크루 모집</h3>
            <button
              className="card-more-link"
              onClick={() => navigate("/crew")}
            >
              더보기
            </button>
          </div>
          <div className="card-widget-body" style={{ display: "block" }}>
            {/* 🌟 기존 더미 코드를 빼고, 백엔드 DB 연동 컴포넌트를 심어줍니다. */}
            <MainCrewCard />
          </div>
        </article>

        <article className="dashboard-card-widget">
          <div className="card-widget-header">
            <h3>실시간 재난 속보</h3>
            <button
              className="card-more-link"
              onClick={() => navigate("/safety")}
            >
              더보기
            </button>
          </div>
          <div className="card-widget-body" style={{ display: "block" }}>
            {/* 🌟 분리된 컴포넌트가 알아서 로딩과 데이터 바인딩을 처리합니다 */}
            <MainSafetyCard />
          </div>
        </article>
      </main>

      {isExpanded && (
        <button
          className="back-to-main-btn"
          onClick={() => {
            setIsExpanded(false);
            setKeyword("");
          }}
        >
          {/* 왼쪽 화살표 곡선 아이콘 혹은 이모지 결합 */}
          <span>↩</span> 메인 화면으로 돌아가기
        </button>
      )}
    </div>
  );
};

export default Main;
