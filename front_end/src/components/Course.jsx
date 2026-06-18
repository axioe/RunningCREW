import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Course.css";
import Header from "./common/Header";
import KakaoMap from "./KakaoMap";
import api from "../js/api";
import { regionData } from "../js/region";

const Course = () => {
  const navigate = useNavigate();

  // API 데이터 및 페이징 상태 정의
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const numOfRows = 4; // 한 페이지에 보여줄 코스 개수

  // 필터 및 지역 검색 상태 정의
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [sortType, setSortType] = useState("최신순");

  // 백엔드 PublicSearchController 호출 함수
  const fetchPublicParks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/public_park", {
        params: {
          pageNo: currentPage,
          numOfRows: numOfRows,
          instt_nm: `${city} ${district}`.trim(), // 예: "서울특별시 성동구"
        },
      });

      // 백엔드 DTO 구조 파싱 (response -> body -> items)
      const responseData = response.data?.response?.body;

      if (responseData && responseData.items && responseData.items.length > 0) {
        // 순수 DB/API 데이터만 UI 구조에 맞게 매핑 (가상 데이터 완전 제거)
        const mappedData = responseData.items.map((item, index) => ({
          id: index + 1 + currentPage * numOfRows,
          type: "public_park",
          title: item.parkNm, // 공원명
          address: item.lnmadr || "주소 정보 없음", // 소재지지번주소
          // 보유 시설 정보들을 조합하여 설명란에 바인딩
          desc:
            [item.mvmFclty, item.cnvnncFclty, item.cltrFclty]
              .filter(Boolean)
              .join(" / ") || "상세 시설 정보가 등록되지 않은 공원입니다.",
          tag: item.parkSe || "공공시설", // 공원구분
          latitude: item.latitude,
          longitude: item.longitude,
          distance: 0.0,
        }));

        setCourses(mappedData);
        setTotalCount(responseData.totalCount || 0);
      } else {
        setCourses([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("공공 체육시설 코스 조회 실패:", error);
      setCourses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const getRunningCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/running/getCourses?page=${currentPage}&size=${numOfRows}`,
      );
      const responseData = response.data;
      console.log(response.data);

      if (
        responseData &&
        responseData.content &&
        responseData.content.length > 0
      ) {
        const mappedData = responseData.content.map((item, index) => ({
          id: item.id,
          type: "private_park",
          title: item.spotName, // 장소
          address: item.address || "주소 정보 없음", // 주소
          desc: item.facilityInfo,
          tag: "기존 장소",
          latitude: item.latitude,
          longitude: item.longitude,
          distance: item.distance,
        }));

        setCourses(mappedData);
        setTotalCount(responseData.totalElements || 0);
      } else {
        setCourses([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error(error);
      setCourses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 번호나 자치구 변경 시 백엔드 API 재호출
  useEffect(() => {
    // fetchPublicParks();
    getRunningCourses();
  }, [currentPage, district]);

  return (
    <div className="cr-page-global-container">
      <Header />

      <section className="cr-hero-illustration-banner">
        <div className="cr-banner-text-wrap">
          <h1>러닝 코스 추천</h1>
          <p>
            지도를 기반으로 실시간 제공되는 최적의 러닝 코스를 추천해드려요.
          </p>
        </div>
      </section>

      <main className="cr-main-split-layout">
        {/* [좌측 구역] 상세 필터 사이드바 */}
        <aside className="cr-filter-sidebar-wrapper">
          <div className="cr-sidebar-header-box">
            <h4>
              <i className="fa-solid fa-magnifying-glass"></i> 검색 및 필터
            </h4>
          </div>

          <div className="cr-sidebar-form-group">
            <label>지역 검색</label>
            {/* 시도 */}
            <select
              className="cr-form-combo-box"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrict("");
              }}
            >
              {/* <option value="서울특별시">서울특별시</option> */}
              <option value="">시·도 선택</option>
              {Object.keys(regionData).map((sidoName) => (
                <option key={sidoName} value={sidoName}>
                  {sidoName}
                </option>
              ))}
            </select>
            {/* 시군구 */}
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
              {/* <option value="성동구">성동구</option>
              <option value="영등포구">영등포구</option>
              <option value="서초구">서초구</option>
              <option value="송파구">송파구</option>
              <option value="강남구">강남구</option> */}
            </select>
          </div>
        </aside>

        {/* [중앙 구역] 코스 추천 리스트 */}
        <section className="cr-center-cards-scroll-container">
          <div className="cr-list-top-meta-bar">
            <span className="cr-total-count-label">
              해당 구역 검색 결과{" "}
              <strong className="count-num">{totalCount}</strong>개의 코스
            </span>

            <select
              className="cr-sort-dropdown-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="최신순">최신순</option>
            </select>
          </div>

          {/* 💡 조건부 렌더링: 로닝 중 -> 데이터 없음 예외처리 -> 데이터 리스트 순서 */}
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#16A34A",
                fontWeight: "bold",
              }}
            >
              <i className="fa-solid fa-spinner fa-spin"></i> 데이터를
              실시간으로 조회하는 중입니다...
            </div>
          ) : courses.length === 0 ? (
            // 🎯 데이터가 없을 때 표시할 예외 처리 문구
            <div
              style={{
                textAlign: "center",
                padding: "100px 0",
                color: "#94a3b8",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <i
                className="fa-solid fa-database"
                style={{
                  display: "block",
                  fontSize: "32px",
                  marginBottom: "12px",
                  color: "#cbd5e1",
                }}
              ></i>
              데이터가 없습니다.
            </div>
          ) : (
            <div className="cr-cards-vertical-stack">
              {courses.map((course) => (
                <div key={course.id} className="cr-item-row-card">
                  <div
                    className="cr-card-thumbnail-area"
                    style={{ backgroundColor: "#f1f5f9" }}
                  >
                    <span className="cr-card-inline-tag tag-facility">
                      {course.tag}
                    </span>
                  </div>
                  <div className="cr-card-main-details">
                    <div className="cr-card-title-line">
                      <h5>{course.title}</h5>
                    </div>
                    <p className="cr-info-location-text">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {course.address}
                    </p>
                    <p className="cr-info-body-desc">{course.desc}</p>

                    <div
                      className="cr-card-bottom-flex-bar"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        className="cr-view-detail-action-btn"
                        onClick={() =>
                          navigate(
                            `/course-detail/${course.id}?district=${district}`,
                          )
                        }
                      >
                        코스 상세 보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 실시간 백엔드 규격 기준 페이징 바 */}
          <div className="cr-pagination-nav-bar">
            <button
              className="arrow-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(totalCount / numOfRows) || 1 },
              (_, i) => i + 1,
            )
              .slice(0, 5)
              .map((num) => (
                <button
                  key={num}
                  className={`page-num-btn ${currentPage === num ? "active" : ""}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            <button
              className="arrow-btn"
              disabled={currentPage >= Math.ceil(totalCount / numOfRows)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </section>

        {/* [우측 구역] 지도 및 안내 판넬 */}
        <section className="cr-right-map-infrastructure-zone">
          <div className="cr-map-api-frame-holder">
            <div className="cr-map-api-placeholder-box-v2">
              {<KakaoMap points={courses} />}
              {/* <i className="fa-solid fa-map-location-dot map-placeholder-icon-v2">
                {<KakaoMap />}
              </i> */}
              {/* <p>Kakao Map 연동 공간</p> */}
            </div>
          </div>

          <article className="cr-public-facilities-info-board">
            <div className="cr-board-header">
              <h5>
                <i className="fa-solid fa-circle-info"></i> 공공체육시설 정보
                안내
              </h5>
              <p>
                본 정보는 문화체육관광부 공공체육시설 API 데이터를 기반으로
                제공합니다.
              </p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Course;
