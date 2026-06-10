import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CrewRecruitment.css";
import Header from "./common/Header";

const CrewRecruitment = () => {
  const navigate = useNavigate();

  // 1. 상태 관리 정의 (탭, 페이지네이션 및 필터)
  const [activeTab, setActiveTab] = useState("전체"); 
  const [currentPage, setCurrentPage] = useState(1);
  
  // 필터 상세 상태들
  const [region, setRegion] = useState("전체 지역");
  const [distance, setDistance] = useState(10); // 슬라이더 제어용 기본값 (10km)
  const [difficulty, setDifficulty] = useState("전체");
  const [recruitmentStatus, setRecruitmentStatus] = useState("전체"); // [전체, 모집중, 만료]
  const [sortOrder, setSortOrder] = useState("최신순"); // [최신순, 인기순]

  // 2. 필터 초기화 핸들러
  const handleResetFilter = () => {
    setRegion("전체 지역");
    setDistance(10);
    setDifficulty("전체");
    setRecruitmentStatus("전체");
    setSortOrder("최신순");
  };

  // 3. 검색하기 제출 핸들러 (알림 메시지 팝업)
  const handleSearchSubmit = () => {
    alert(
      `[검색 기록 안내]\n` +
      `• 지역: ${region}\n` +
      `• 조건 범위: ${distance}km 이내\n` +
      `• 난이도: ${difficulty}\n` +
      `• 모집 현황: ${recruitmentStatus}\n` +
      `• 정렬 방식: ${sortOrder}\n\n` +
      `위 조건으로 필터링 데이터 연동 처리가 대기 중입니다.`
    );
  };

  // 상단 추천 크루 임시 하드코딩 Mock 데이터
  const topRecommendedCrews = [
    {
      id: 1,
      title: "한강 10K 함께 달려요!",
      location: "여의도 한강공원",
      date: "2026.06.08 (토) 07:00",
      distance: "10.0km",
      level: "중",
      desc: "아침에 상쾌하게 10K 함께 달려요!",
      currentMember: 8,
      maxMember: 15,
      img: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=400"
    },
    {
      id: 2,
      title: "서울숲 5K 모닝 런",
      location: "서울숲 공원",
      date: "2026.06.09 (일) 06:30",
      distance: "5.0km",
      level: "하",
      desc: "모닝 런으로 하루를 활기차게 시작해요!",
      currentMember: 6,
      maxMember: 12,
      img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=400"
    },
    {
      id: 3,
      title: "반포 야간 러닝 크루",
      location: "반포 한강공원",
      date: "2026.06.07 (금) 20:00",
      distance: "7.0km",
      level: "중",
      desc: "시원한 밤, 한강 야경 보며 달려요!",
      currentMember: 7,
      maxMember: 10,
      img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400"
    }
  ];

  // 메인 하단 리스트 - 전체 모집글 데이터
  const totalCrewsMock = [
    { id: 1, title: "올림픽공원 8K 주말 런", location: "올림픽공원", date: "2026.06.10 (월) 08:00", distance: "8.0km", level: "상", current: 10, max: 15, timeAgo: "2시간 전", isNew: true },
    { id: 2, title: "뚝섬한강공원 저녁 러닝", location: "뚝섬한강공원", date: "2026.06.11 (화) 19:30", distance: "6.0km", level: "중", current: 5, max: 10, timeAgo: "5시간 전", isNew: false },
    { id: 3, title: "남산 힐링 러닝", location: "남산공원", date: "2026.06.12 (금) 07:00", distance: "4.5km", level: "하", current: 3, max: 8, timeAgo: "1일 전", isNew: false }
  ];

  return (
    <div className="crw-global-container">
      
      <Header/>

      {/* 2. 메인 배너 섹션 */}
      <section className="crw-hero-banner">
        <div className="crw-banner-inner">
          <h1>함께 달릴 <span className="highlight-green">크루</span>를 찾아보세요!</h1>
          <p>다양한 러닝 크루가 여러분을 기다리고 있어요.<br />새로운 사람들과 함께 더 즐겁게 달려보세요!</p>
        </div>
      </section>

      {/* 3. 추천 크루 모집 영역 */}
      <section className="crw-recommended-section">
        <div className="crw-section-title-bar">
          <h3><i className="fa-solid fa-star star-green"></i> 추천 크루 모집</h3>
          <button className="crw-write-post-btn" onClick={() => alert("모집글 작성 페이지로 이동 예정입니다.")}>
            <i className="fa-solid fa-plus"></i> 모집글 작성하기
          </button>
        </div>

        <div className="crw-recommended-grid">
          {topRecommendedCrews.map((crew) => (
            <div key={crew.id} className="crw-recom-card">
              <div className="crw-recom-img-holder" style={{ backgroundImage: `url(${crew.img})` }}>
                <span className="crw-badge-pill green">추천</span>
              </div>
              <div className="crw-recom-body">
                <h4>{crew.title}</h4>
                <p className="meta-info"><i className="fa-solid fa-location-dot"></i> {crew.location}</p>
                <p className="meta-info"><i className="fa-regular fa-calendar"></i> {crew.date}</p>
                <div className="meta-specs">
                  <span><i className="fa-solid fa-route"></i> {crew.distance}</span>
                  <span className="level-badge">{crew.level}</span>
                </div>
                <p className="crews-short-desc">"{crew.desc}"</p>
                
                <div className="crw-card-footer-flex">
                  <div className="avatar-group-mock">
                    <span className="mock-user">👤</span>
                    <span className="mock-user">👤</span>
                    <span className="mock-user">👤</span>
                    <span className="plus-count">+8</span>
                  </div>
                  <div className="member-ratio-indicator">
                    <strong className="active-green">{crew.currentMember}</strong> / {crew.maxMember}명
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 대시보드 하단 레이아웃 콘텐츠 분할 구역 */}
      <main className="crw-split-main-dashboard">
        
        {/* [중앙-좌측 배치] 게시판 영역 */}
        <section className="crw-board-left-container">
          <div className="crw-tab-header-menu">
            <button className={activeTab === "전체" ? "active" : ""} onClick={() => setActiveTab("전체")}>전체 모집글</button>
            <button className={activeTab === "신규" ? "active" : ""} onClick={() => setActiveTab("신규")}>신규 모집</button>
            <button className={activeTab === "인기" ? "active" : ""} onClick={() => setActiveTab("인기")}>인기 모집</button>
          </div>

          <div className="crw-list-items-stack">
            {/* 전체 탭 렌더링 */}
            {activeTab === "전체" && totalCrewsMock.map((crew) => (
              <div key={crew.id} className="crw-list-row-item">
                <div className="crw-list-row-img-placeholder"></div>
                <div className="crw-list-row-details">
                  <div className="title-row-line">
                    <h5>
                      {crew.title} 
                      {crew.isNew && <span className="new-flash-badge">NEW</span>}
                    </h5>
                  </div>
                  <div className="horizontal-spec-infos">
                    <span>📍 {crew.location}</span>
                    <span>📅 {crew.date}</span>
                    <span>🏃 {crew.distance}</span>
                    <span className="badge-text-lv">{crew.level}</span>
                  </div>
                  <p className="row-item-sub-caption">주말 아침, 함께 활기차게 코스 러닝 하실 분 모집합니다!</p>
                </div>
                <div className="crw-list-row-right-status">
                  <div className="ratio-number"><strong>{crew.current}</strong> / {crew.max}명</div>
                  <div className="passed-time-stamp">{crew.timeAgo}</div>
                  <i className="fa-regular fa-bookmark row-bookmark-icon"></i>
                </div>
              </div>
            ))}

            {/* 신규 모집 탭 분기 처리 */}
            {activeTab === "신규" && (
              <div className="crw-list-row-item placeholder-tab-card">
                <div className="crw-list-row-img-placeholder"></div>
                <div className="crw-list-row-details">
                  <h5>신규 모집 페이지입니다</h5>
                  <p className="horizontal-spec-infos">현재 등록된 가장 최신의 게시판 DB 리스트업 상태입니다.</p>
                </div>
                <div className="crw-list-row-right-status">
                  <div className="ratio-number"><strong>1</strong> / 10명</div>
                  <div className="passed-time-stamp">방금 전</div>
                </div>
              </div>
            )}

            {/* 인기 모집 탭 분기 처리 */}
            {activeTab === "인기" && (
              <div className="crw-list-row-item placeholder-tab-card">
                <div className="crw-list-row-img-placeholder"></div>
                <div className="crw-list-row-details">
                  <h5>인기 모집 페이지입니다</h5>
                  <p className="horizontal-spec-infos">신청률 및 조회수가 높은 순으로 정렬된 공간입니다.</p>
                </div>
                <div className="crw-list-row-right-status">
                  <div className="ratio-number"><strong style={{color: '#ef4444'}}>12</strong> / 12명</div>
                  <div className="passed-time-stamp">인기 폭발</div>
                </div>
              </div>
            )}
          </div>

          {/* 5. 페이지네이션 바 하단 구동 제어 */}
          <div className="crw-pagination-container">
            <button className="pg-arrow" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button 
                key={pageNum} 
                className={`pg-num-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button className="pg-arrow" onClick={() => setCurrentPage(prev => Math.min(prev + 1, 5))}>&gt;</button>
          </div>
        </section>

        {/* [우측 배치] 기획안 통합형 고급 인터랙티브 필터 컴포넌트 */}
        <aside className="crw-filter-right-sidebar">
          <div className="crw-sidebar-top-meta">
            <h4>필터</h4>
            <button className="crw-clear-all-btn" onClick={handleResetFilter}>
              초기화 <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>

          {/* 지역 선택 */}
          <div className="crw-filter-widget">
            <label>지역</label>
            <select className="crw-dropdown-box" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="전체 지역">전체 지역</option>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
            </select>
          </div>

          {/* 거리 제어 컴포넌트 (마우스 드래그 슬라이더 반영) */}
          <div className="crw-filter-widget">
            <label>거리 (범위 제어: {distance}km 이내)</label>
            <input 
              type="range" min="1" max="20" step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="crw-slider-input"
            />
            <div className="crw-slider-labels-flex">
              <span>1km</span>
              <span>20km+</span>
            </div>
          </div>

          {/* 난이도 분기 */}
          <div className="crw-filter-widget">
            <label>난이도</label>
            <div className="crw-level-btn-row">
              {["전체", "새싹", "나무", "숲"].map((lvl) => (
                <button
                  key={lvl}
                  className={`crw-filter-pill ${difficulty === lvl ? "active" : ""}`}
                  onClick={() => setDifficulty(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* 모집 현황 수정 요구 사항 연동 [전체, 모집중, 만료] */}
          <div className="crw-filter-widget">
            <label>모집 현황</label>
            <select 
              className="crw-dropdown-box" 
              value={recruitmentStatus} 
              onChange={(e) => setRecruitmentStatus(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="모집중">모집중</option>
              <option value="만료">만료</option>
            </select>
          </div>

          {/* 정렬 방식 컴포넌트 스펙 지정 [최신순, 인기순] */}
          <div className="crw-filter-widget">
            <label>정렬</label>
            <select 
              className="crw-dropdown-box" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
            </select>
          </div>

          {/* 검색하기 버튼 트리거 */}
          <button className="crw-search-action-btn" onClick={handleSearchSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i> 검색하기
          </button>
        </aside>

      </main>

      {/* 6. 하단 기획 브랜드 핵심 가치 그리드 바 */}
      <footer className="crw-footer-core-value-bar">
        <div className="value-item">
          <div className="value-icon">👥</div>
          <div className="value-txt"><h5>다양한 크루</h5><p>초보자부터 마라토너까지 모두 만나보세요.</p></div>
        </div>
        <div className="value-item">
          <div className="value-icon">👟</div>
          <div className="value-txt"><h5>맞춤 러닝</h5><p>거리와 난이도가 맞는 최적의 매칭 시스템.</p></div>
        </div>
        <div className="value-item">
          <div className="value-icon">🛡️</div>
          <div className="value-txt"><h5>안전한 러닝</h5><p>함께 달리면 더 안전하고 활기차집니다.</p></div>
        </div>
        <div className="value-item">
          <div className="value-icon">💚</div>
          <div className="value-txt"><h5>함께 성장</h5><p>서로 응원하며 페이스 메이커가 되어줍니다.</p></div>
        </div>
      </footer>
    </div>
  );
};

export default CrewRecruitment;