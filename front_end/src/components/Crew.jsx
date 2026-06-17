import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Crew.css";
import Header from "./common/Header";

const Crew = () => {
  const navigate = useNavigate();

  // 💡 DB 데이터 및 페이징/로딩 상태 관리
  const [crewList, setCrewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 4; // 한 페이지당 보여줄 게시글 개수

  // 상단 카테고리 탭 (전체, 신규, 인기)
  const [activeTab, setActiveTab] = useState("전체");

  // 우측 필터 상세 상태들
  const [region, setRegion] = useState("전체 지역");
  const [distance, setDistance] = useState(10);
  const [difficulty, setDifficulty] = useState("전체");
  const [recruitmentStatus, setRecruitmentStatus] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");

  // 💡 CrewPostController(/post) 기준 목록 및 필터링 조회 함수
  const fetchCrewPostList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/post/list", {
        params: {
          tab: activeTab,
          region: region,
          distance: distance,
          difficulty: difficulty,
          status: recruitmentStatus,
          sort: sortOrder
        }
      });

      if (response.data) {
        // 🎯 백엔드가 어떤 규격(순수 List, Page 객체, ResultResponse 등)으로 응답해도 배열을 뽑아내는 방어 로직
        let fetchedData = [];
        
        if (Array.isArray(response.data)) {
          fetchedData = response.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
          fetchedData = response.data.content;
        } else if (typeof response.data === "object") {
          fetchedData = response.data.data || [];
        }

        setCrewList(Array.isArray(fetchedData) ? fetchedData : []);
        setTotalPages(Math.ceil((fetchedData.length || 1) / pageSize) || 1);
      } else {
        setCrewList([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("크루 모집글 목록 로드 실패:", error);
      setCrewList([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // 💡 탭이 바뀌거나 페이지가 바뀔 때 실시간 자동 연동
  useEffect(() => {
    fetchCrewPostList();
  }, [currentPage, activeTab]);

  // 필터 초기화 핸들러
  const handleResetFilter = () => {
    setRegion("전체 지역");
    setDistance(10);
    setDifficulty("전체");
    setRecruitmentStatus("전체");
    setSortOrder("최신순");
    setCurrentPage(1);
  };

  // 검색하기 제출 핸들러
  const handleSearchSubmit = () => {
    setCurrentPage(1);
    fetchCrewPostList();
  };

  // 날짜 포맷팅 헬퍼 함수 (LocalDateTime -> YYYY.MM.DD)
  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 현재 페이지에 해당하는 데이터 조각 추출 (배열 여부 확인 후 안전하게 슬라이싱)
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = Array.isArray(crewList) 
    ? crewList.slice(indexOfFirstItem, indexOfLastItem) 
    : [];

  return (
    <div className="crw-global-container">
      <Header />

      {/* 메인 배너 섹션 */}
      <section className="crw-hero-banner">
        <div className="crw-banner-inner">
          <h1>
            함께 달릴 <span className="highlight-green">크루</span>를 찾아보세요!
          </h1>
          <p>
            다양한 러닝 크루가 여러분을 기다리고 있어요.
            <br />
            새로운 사람들과 함께 더 즐겁게 달려보세요!
          </p>
        </div>
      </section>

      {/* 대시보드 하단 레이아웃 콘텐츠 분할 구역 */}
      <main className="crw-split-main-dashboard" style={{ marginTop: "40px" }}>
        {/* [좌측 배치] 게시판 영역 */}
        <section className="crw-board-left-container">
          <div className="crw-tab-header-menu">
            {["전체", "신규", "인기"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              >
                {tab} 모집글
              </button>
            ))}
            <button className="crw-write-post-btn" style={{ marginLeft: "auto" }} onClick={() => navigate("/write")}>
              <i className="fa-solid fa-plus"></i> 모집글 작성하기
            </button>
          </div>

          <div className="crw-list-items-stack">
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#16A34A", fontWeight: "bold" }}>
                <i className="fa-solid fa-spinner fa-spin"></i> 크루 데이터를 실시간으로 조회 중입니다...
              </div>
            ) : (!currentItems || !Array.isArray(currentItems) || currentItems.length === 0) ? (
              // 🎯 [예외 및 안전장치] currentItems가 없거나 빈 배열일 때 표출될 예외 처리 레이아웃
              <div style={{ textAlign: "center", padding: "100px 0", color: "#94a3b8", fontSize: "16px", fontWeight: "500" }}>
                <i className="fa-solid fa-database" style={{ display: "block", fontSize: "32px", marginBottom: "12px", color: "#cbd5e1" }}></i>
                DB 데이터가 없습니다.
              </div>
            ) : (
              // 🎯 [실시간 루프 구역] 오직 데이터가 확실한 '배열' 상태일 때만 안전하게 돌리는 맵
              currentItems.map((crew) => (
                <div 
                  key={crew.id} 
                  className="crw-list-row-item" 
                  onClick={() => navigate(`/post/${crew.id}`)} 
                  style={{ cursor: "pointer" }}
                >
                  <div className="crw-list-row-img-placeholder">
                    <i className="fa-solid fa-users" style={{ fontSize: "24px", color: "#94a3b8" }}></i>
                  </div>
                  <div className="crw-list-row-details">
                    <div className="title-row-line">
                      <h5>{crew.title}</h5>
                    </div>
                    <div className="horizontal-spec-infos">
                      <span>📍 코스 ID: {crew.courseId}</span>
                      <span>📅 일정: {formatDate(crew.appliedAt)}</span>
                    </div>
                    <p className="row-item-sub-caption">{crew.content}</p>
                  </div>
                  <div className="crw-list-row-right-status">
                    <div className="ratio-number">
                      정원 <strong>{crew.maxPeople}</strong>명 제한
                    </div>
                    <div className="passed-time-stamp">모집중</div>
                    <i className="fa-regular fa-bookmark row-bookmark-icon"></i>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 페이지네이션 바 */}
          <div className="crw-pagination-container">
            <button
              className="pg-arrow"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`pg-num-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="pg-arrow"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>
          </div>
        </section>

        {/* [우측 배치] 인터랙티브 필터 사이드바 */}
        <aside className="crw-filter-right-sidebar">
          <div className="crw-sidebar-top-meta">
            <h4>필터</h4>
            <button className="crw-clear-all-btn" onClick={handleResetFilter}>
              초기화 <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>

          <div className="crw-filter-widget">
            <label>지역</label>
            <select className="crw-dropdown-box" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="전체 지역">전체 지역</option>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
            </select>
          </div>

          <div className="crw-filter-widget">
            <label>거리 (범위 제어: {distance}km 이내)</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="crw-slider-input"
            />
            <div className="crw-slider-labels-flex">
              <span>1km</span>
              <span>20km+</span>
            </div>
          </div>

          <div className="crw-filter-widget">
            <label>난이도</label>
            <div className="crw-level-btn-row">
              {["전체", "새싹", "나무", "숲"].map((lvl) => (
                <button
                  key={lvl}
                  className={`crw-filter-pill ${difficulty === lvl ? `active active-${lvl}` : ""}`}
                  onClick={() => setDifficulty(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="crw-filter-widget">
            <label>모집 현황</label>
            <select className="crw-dropdown-box" value={recruitmentStatus} onChange={(e) => setRecruitmentStatus(e.target.value)}>
              <option value="전체">전체</option>
              <option value="모집중">모집중</option>
              <option value="만료">만료</option>
            </select>
          </div>

          <div className="crw-filter-widget">
            <label>정렬</label>
            <select className="crw-dropdown-box" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
            </select>
          </div>

          <button className="crw-search-action-btn" onClick={handleSearchSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i> 검색하기
          </button>
        </aside>
      </main>

      {/* 하단 디자인 바 */}
      <footer className="crw-footer-core-value-bar">
        <div className="value-item">
          <div className="value-icon">👥</div>
          <div className="value-txt">
            <h5>다양한 크루</h5>
            <p>초보자부터 마라토너까지 모두 만나보세요.</p>
          </div>
        </div>
        <div className="value-item">
          <div className="value-icon">👟</div>
          <div className="value-txt">
            <h5>맞춤 러닝</h5>
            <p>거리와 난이도가 맞는 최적의 매칭 시스템.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Crew;