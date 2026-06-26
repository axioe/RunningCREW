import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import Header from "./common/Header";
import MainSafetyCard from "./common/MainSafetyCard";
import MainCrewCard from "./common/MainCrewCard";
import MainMyCrewCard from "./common/MainMyCrewCard";
import useAuthStore from "./common/useAuthStore";
import api from "../js/api";
import { MdCheckBox } from "react-icons/md";
import { Pagination } from "react-bootstrap";

const Main = () => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const token = useAuthStore((state) => state.accessToken);
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageCount, setPageCount] = useState(6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    setTotalPage(0);
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }
    if (!isExpanded) {
      // 상태 변경 트리거
      setIsExpanded(true);
    } else {
      searchKeyword();
    }
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

  const searchKeyword = async () => {
    if (isExpanded) {
      try {
        setIsSearching(true);
        setSearchResults([]);
        const response = await api.get(
          `/running/search?page=${page}&size=${pageCount}&keyword=${keyword}`,
        );
        if (response && response.data) {
          setSearchResults(response.data.content || []);
          setTotalPage(response.data.totalPages || 0);
        }
      } catch (err) {
      } finally {
        setIsSearching(false);
      }
    }
  };

  useEffect(() => {
    searchKeyword();
  }, [isExpanded, page]);

  // 💡 안전한 클래스 결합 방식 적용 (공백 누락으로 인한 인식 불가 오류 원천 차단)
  const containerClasses = [
    "nature-runner-main-wrapper",
    isExpanded ? "expanded-mode" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleSelect = (id) => {
    setSelectedItems(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // 선택 해제
          : [...prev, id], // 선택
    );
  };

  const pageGroup = Math.floor(page / pageCount);
  const startPage = pageGroup * pageCount;
  const endPage = Math.min(startPage + pageCount, totalPage);

  return (
    <div className={containerClasses}>
      <Header />

      {/* 중앙 히어로 섹션 */}
      <section className="main-hero-banner">
        <div className="hero-center-content">
          <h2>함께 달리는 러닝, Running Crew와 함께하세요</h2>
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
                  <div
                    key={item.id}
                    className={`search-result-card ${
                      selectedItems.includes(item.id) ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(item.id)}
                  >
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        readOnly
                      />
                    </div>
                    <h4>{item.spotName}</h4>
                    <p>{item.address}</p>
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
            {token && (
              <button
                className="card-more-link"
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
        <div className="bottom-area">
          <div className="pagination-wrapper">
            <Pagination>
              <Pagination.First
                disabled={page < pageCount}
                onClick={() => {
                  if (page > pageCount) setPage(page - pageCount);
                }}
              />
              <Pagination.Prev
                disabled={page == 0}
                onClick={() => {
                  if (page > 0) setPage(page - 1);
                }}
              />
              {[...Array(endPage - startPage)].map((_, index) => {
                const pageNumber = startPage + index;
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={page == pageNumber}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber + 1}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next
                disabled={page == totalPage - 1}
                onClick={() => {
                  if (page < totalPage - 1) setPage(page + 1);
                }}
              />
              <Pagination.Last
                disabled={page >= totalPage - pageCount}
                onClick={() => {
                  if (page < totalPage - pageCount) setPage(page + pageCount);
                }}
              />
            </Pagination>
          </div>
          <div className="button-group">
            <button
              className="selected-btn"
              onClick={() => {
                if (selectedItems.length > 0) {
                  navigate("/course", {
                    state: {
                      selectedItems,
                    },
                  });
                }
              }}
            >
              <MdCheckBox size={22} /> 러닝 코스 보기
            </button>
            <button
              className="back-to-main-btn"
              onClick={() => {
                setIsExpanded(false);
                setKeyword("");
                setSearchResults([]);
                setSelectedItems([]);
              }}
            >
              {/* 왼쪽 화살표 곡선 아이콘 혹은 이모지 결합 */}
              <span>↩</span> 메인 화면으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
