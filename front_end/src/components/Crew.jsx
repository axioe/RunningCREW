import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Crew.css";
import Header from "./common/Header";
import api from "../js/api.js";
import { regionData } from "../js/region";
import CrewList from "./CrewList.jsx";

const Crew = () => {
  const navigate = useNavigate();

  // DB 데이터 및 페이징 상태 관리
  const [crewList, setCrewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 4; // 한 페이지에 4개씩 표출

  const [activeTab, setActiveTab] = useState("전체");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [distance, setDistance] = useState(10);
  const [difficulty, setDifficulty] = useState("전체");

  // 데이터 조회 함수
  const fetchCrewPostList = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === "인기" ? "/post/best_list" : "/post/list";
      const response = await api.get(endpoint, {
        params: {
          // 🌟 [수정] 프론트엔드 슬라이싱 페이징을 위해 전체 데이터를 한 번에 가져오도록 page를 0으로 고정, size를 늘립니다.
          page: 0,
          size: 100,
          address: `${city} ${district}`.trim(),
          distance,
          difficulty,
          sortType,
        },
      });
      let fetchedData =
        response.data?.content || response.data?.data || response.data || [];
      if (!Array.isArray(fetchedData)) fetchedData = [];

      // 탭별 데이터 정제
      if (activeTab === "신규") {
        const sortedNew = [...fetchedData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        fetchedData = sortedNew.slice(0, 5);
        setTotalPages(1);
      } else if (activeTab === "인기") {
        // 🔧 [수정] currentPeople → appliedCnt (백엔드 실제 필드명)
        const filteredBest = fetchedData.filter(
          (crew) => (crew.appliedCnt || 0) >= crew.maxPeople / 2,
        );
        fetchedData = filteredBest.slice(0, 5);
        setTotalPages(1);
      } else {
        // '전체' 탭일 때 총 페이지 수 계산 (전체 데이터 개수 기반)
        setTotalPages(Math.ceil((fetchedData.length || 1) / pageSize) || 1);
      }

      setCrewList(fetchedData);
    } catch (error) {
      console.error("크루 모집글 목록 로드 실패:", error);
      setCrewList([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 이동 시 API를 다시 찌르는 것이 아니라 프론트엔드에서 계산된 배열 조각만 바꿔 띄우기 위함입니다.
  useEffect(() => {
    fetchCrewPostList();
  }, [activeTab]);

  // 필터 초기화 핸들러
  const handleResetFilter = () => {
    setCity("");
    setDistrict("");
    setDistance(10);
    setDifficulty("전체");
    setSortType("latest");
    setCurrentPage(1);
  };

  // 검색하기 제출 핸들러
  const handleSearchSubmit = () => {
    setCurrentPage(1);
    fetchCrewPostList();
  };

  // 현재 페이지에 해당하는 데이터 조각 추출
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
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // 탭 전환 시 1페이지로 강제 리셋
                }}
              >
                {tab} 모집글
              </button>
            ))}
            <button
              className="crw-write-post-btn"
              style={{ marginLeft: "auto" }}
              onClick={() => navigate("/write")}
            >
              <i className="fa-solid fa-plus"></i> 모집글 작성하기
            </button>
          </div>

          {/* 연동된 CrewList 컴포넌트 */}
          <CrewList currentItems={currentItems} loading={loading} />

          {/* 🌟 페이징 제어 구역: '전체' 탭이면서 총 페이지가 2페이지 이상(게시글이 5개 이상)일 때만 하단 바 노출 */}
          {activeTab === "전체" && totalPages > 1 && (
            <div className="crw-pagination-container">
              <button
                className="pg-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`pg-num-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ),
              )}
              <button
                className="pg-arrow"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                &gt;
              </button>
            </div>
          )}
        </section>

        {/* [우측 배치] 필터 사이드바 */}
        <aside className="crw-filter-right-sidebar">
          <div className="crw-sidebar-top-meta">
            <h4>필터</h4>
            <button className="crw-clear-all-btn" onClick={handleResetFilter}>
              초기화 <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>

          <div className="cr-sidebar-form-group">
            <label>지역 검색</label>
            <select
              className="cr-form-combo-box"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrict("");
              }}
            >
              <option value="">시·도 선택</option>
              {Object.keys(regionData).map((sidoName) => (
                <option key={sidoName} value={sidoName}>
                  {sidoName}
                </option>
              ))}
            </select>
            <select
              className="cr-form-combo-box"
              style={{ marginTop: "8px" }}
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setCurrentPage(1);
              }}
              disabled={!city}
            >
              <option value="">시·군·구 선택</option>
              {city &&
                regionData[city].map((sigunguName) => (
                  <option key={sigunguName} value={sigunguName}>
                    {sigunguName}
                  </option>
                ))}
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

          <button className="crw-search-action-btn" onClick={handleSearchSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i> 검색하기
          </button>
        </aside>
      </main>

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