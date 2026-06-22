import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Search.css";
import Header from "./common/Header";
// import api from "../../js/api";

const Search = () => {
  const navigate = useNavigate();

  // 1. DB에서 가져온 전체 원본 데이터 상태
  const [dbData, setDbData] = useState([]);

  // 2. [현재 UI 상태] 사용자가 화면에서 조작 중인 임시 필터 상태들
  const [keyword, setKeyword] = useState("");      // 상단 장소 검색어
  const [city, setCity] = useState("전체");         
  const [distance, setDistance] = useState(20);     
  const [difficulty, setDifficulty] = useState("전체"); 
  const [courseTypes, setCourseTypes] = useState({
    순환: false, 왕복: false, 트레일: false, 공원: false
  });
  const [options, setOptions] = useState({
    화장실: false, 음용수대: false, 주차: false
  });

  // 🎯 3. [최종 적용 필터 상태] 버튼을 눌렀을 때만 업데이트되는 진짜 필터 기준점
  const [appliedFilters, setAppliedFilters] = useState({
    keyword: "",
    city: "전체",
    distance: 20,
    difficulty: "전체",
    courseTypes: { 순환: false, 왕복: false, 트레일: false, 공원: false },
    options: { 화장실: false, 음용수대: false, 주차: false }
  });

  // 💡 4. 백엔드 컨트롤러(/running/getSpots) 호출 함수
  const fetchSearchData = async (searchWord) => {
    try {
      // @GetMapping("/getSpots")에 맞게 매핑 수정 (기본 size는 100건 정도로 넉넉히 가져와서 클라이언트 필터링)
      const res = await api.get(`/running/getSpots`, {
        params: {
          page: 0,
          size: 100,
          spot_name: searchWord || "서울" // 검색어가 없을 때 기본값 지정 가능
        }
      });
      
      // PageResponse 구조상 데이터 배열이 content 안에 들어있으므로 추출
      // 만약 백엔드 PageResponse의 실제 필드명이 다르면 res.data.list 등으로 변경 필요
      if (res.data && res.data.content) {
        setDbData(res.data.content);
      }
    } catch (error) {
      System.out.error("백엔드 데이터 호출 실패. 임시 데이터를 적용합니다.", error);
      // 백엔드가 꺼져있거나 매칭 오류 시 테스트용 데이터 유지
      setDbData([
        { id: 1, title: "서울숲 러닝코스", location: "서울특별시 성동구 서울숲길", distance: 5.2, difficulty: "나무", type: "공원", hasToilet: true, hasWater: true, hasParking: false, imgClass: "main-road-1" },
        { id: 2, title: "한강 뚝섬 코스", location: "서울특별시 성동구 뚝섬한강공원", distance: 7.8, difficulty: "새싹", type: "순환", hasToilet: true, hasWater: false, hasParking: true, imgClass: "main-road-2" },
        { id: 3, title: "남산 고난도 트레일", location: "서울특별시 중구 남산공원", distance: 12.5, difficulty: "숲", type: "트레일", hasToilet: false, hasWater: true, hasParking: false, imgClass: "main-road-1" }
      ]);
    }
  };

  // 컴포넌트 최초 로드 시 기본 검색 실행
  useEffect(() => {
    fetchSearchData("");
  }, []);

  // 💡 5. [필터 적용] 버튼 & 상단 [검색] 버튼 클릭 핸들러
  const handleApplyFilter = () => {
    // 버튼을 누르는 순간 백엔드에서 해당 검색어로 데이터를 다시 긁어옵니다.
    fetchSearchData(keyword);

    // 상세 필터 기준점 갱신
    setAppliedFilters({
      keyword,
      city,
      distance,
      difficulty,
      courseTypes: { ...courseTypes },
      options: { ...options }
    });
  };

  // 🔄 초기화 버튼 핸들러
  const handleReset = () => {
    setKeyword(""); setCity("전체"); setDistance(20); setDifficulty("전체");
    setCourseTypes({ 순환: false, 왕복: false, 트레일: false, 공원: false });
    setOptions({ 화장실: false, 음용수대: false, 주차: false });
    setAppliedFilters({
      keyword: "", city: "전체", distance: 20, difficulty: "전체",
      courseTypes: { 순환: false, 왕복: false, 트레일: false, 공원: false },
      options: { 화장실: false, 음용수대: false, 주차: false }
    });
    fetchSearchData("");
  };

  const handleCheckboxChange = (type, name) => {
    if (type === "type") {
      setCourseTypes(prev => ({ ...prev, [name]: !prev[name] }));
    } else {
      setOptions(prev => ({ ...prev, [name]: !prev[name] }));
    }
  };

// RunningLevel ENUM 구조(HIGH, MEDIUM, LOW)를 반영한 필터링
  const filteredData = dbData.filter((item) => {
    // (1) 상단 검색어 필터: spotName 또는 address 기준
    const matchesKeyword = 
      (item.spotName && item.spotName.toLowerCase().includes(appliedFilters.keyword.toLowerCase())) || 
      (item.address && item.address.toLowerCase().includes(appliedFilters.keyword.toLowerCase()));

    // (2) 좌측 지역 선택 필터: address 기준
    const matchesCity = appliedFilters.city === "전체" || (item.address && item.address.includes(appliedFilters.city));

    // (3) 거리 슬라이더 필터: distance 기준 (선택 수치 이하)
    const matchesDistance = item.distance <= appliedFilters.distance;

    // (4) 난이도 필터: UI 한글 텍스트를 백엔드 ENUM(HIGH, MEDIUM, LOW)과 매칭
    let mappedLevel = "전체";
    if (appliedFilters.difficulty === "새싹") mappedLevel = "LOW";
    if (appliedFilters.difficulty === "나무") mappedLevel = "MEDIUM";
    if (appliedFilters.difficulty === "숲") mappedLevel = "HIGH";

    const matchesDifficulty = appliedFilters.difficulty === "전체" || item.runningLevel === mappedLevel;

    // 최종 교집합 결과 반환
    return matchesKeyword && matchesCity && matchesDistance && matchesDifficulty;
  });

  return (
    <div className="search-page-container">
      <Header/>

      {/* 2. 검색 필터 헤더 섹션 */}
      <section className="search-header-section">
        <h1>러닝 코스 및 크루 검색</h1>
        <p>원하는 지역과 장소를 검색해보세요.</p>
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="지역명 또는 장소명을 입력하세요" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} 
          />
          <button className="search-submit-btn" onClick={handleApplyFilter}>검색</button>
        </div>
      </section>

      {/* 3. 레이아웃 본문 */}
      <main className="search-main-content">
        
        {/* [좌측] 상세 필터 레이어 */}
        <aside className="filter-sidebar">
          <div className="sidebar-title-box">
            <h3>상세 필터</h3>
            <button className="reset-btn" onClick={handleReset}>🔄 초기화</button>
          </div>
          
          <div className="filter-group">
            <label>지역 선택</label>
            <select className="filter-select" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="전체">전체 시/도</option>
              <option value="서울">서울특별시</option>
              <option value="경기">경기도</option>
            </select>
          </div>

          <div className="filter-group">
            <label>거리 (최대: {distance}km)</label>
            <input 
              type="range" min="1" max="20" step="1" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              <span>1km</span>
              <span>20km+</span>
            </div>
          </div>

          <div className="filter-group">
            <label>난이도</label>
            <div className="difficulty-btn-group">
              <button 
                className={`diff-btn beginner-btn ${difficulty === "새싹" ? "active" : ""}`}
                onClick={() => setDifficulty(difficulty === "새싹" ? "전체" : "새싹")}
              >새싹</button>
              <button 
                className={`diff-btn intermediate-btn ${difficulty === "나무" ? "active" : ""}`}
                onClick={() => setDifficulty(difficulty === "나무" ? "전체" : "나무")}
              >나무</button>
              <button 
                className={`diff-btn advanced-btn ${difficulty === "숲" ? "active" : ""}`}
                onClick={() => setDifficulty(difficulty === "숲" ? "전체" : "숲")}
              >숲</button>
            </div>
          </div>

          <div className="filter-group">
            <label>코스 유형</label>
            <div className="checkbox-grid-layout">
              <label><input type="checkbox" checked={courseTypes.순환} onChange={() => handleCheckboxChange("type", "순환")} /> 순환 코스</label>
              <label><input type="checkbox" checked={courseTypes.왕복} onChange={() => handleCheckboxChange("type", "왕복")} /> 왕복 코스</label>
              <label><input type="checkbox" checked={courseTypes.트레일} onChange={() => handleCheckboxChange("type", "트레일")} /> 트레일 코스</label>
              <label><input type="checkbox" checked={courseTypes.공원} onChange={() => handleCheckboxChange("type", "공원")} /> 공원 코스</label>
            </div>
          </div>

          <div className="filter-group">
            <label>기타 옵션</label>
            <div className="checkbox-grid-layout">
              <label><input type="checkbox" checked={options.화장실} onChange={() => handleCheckboxChange("option", "화장실")} /> 화장실 있음</label>
              <label><input type="checkbox" checked={options.음용수대} onChange={() => handleCheckboxChange("option", "음용수대")} /> 음용수대 있음</label>
              <label><input type="checkbox" checked={options.주차} onChange={() => handleCheckboxChange("option", "주차")} /> 주차 가능</label>
            </div>
          </div>

          <button className="apply-filter-btn" onClick={handleApplyFilter}>
            필터 적용
          </button>
        </aside>

        {/* [중앙] 검색 결과 리스트 */}
        <section className="results-container">
          <div className="tab-menu">
            <button className="active">전체</button>
            <button onClick={() => navigate("/course")}>러닝 코스</button>
            <button onClick={() => navigate("/crew")}>러닝 크루</button>
            <button>공공체육시설</button>
          </div>

          <div className="result-section">
            <div className="section-header">
              <h4>검색 결과 <span className="total-count">총 {filteredData.length}건</span></h4>
            </div>
            
            <div className="section-sub-title">
              <h5>📈 맞춤형 추천 목록</h5>
            </div>

            <div className="card-list">
              {filteredData.length === 0 ? (
                <p className="no-result" style={{padding: "40px 0", color: "#888"}}>조건을 만족하는 러닝 코스가 존재하지 않습니다.</p>
              ) : (
                filteredData.map((course) => (
                  <div key={course.id} className="course-card">
                    {/* 이미지 자리 */}
                    <div className="card-img-placeholder main-road-1"></div>
                    
                    <div className="card-info">
                      <h5>{course.spotName}</h5>
                      <p>📍 {course.address}</p>
                      <p>
                        {course.distance}km • 난이도:{" "}
                        {/* 💡 백엔드 ENUM에 따른 조건부 뱃지 렌더링 */}
                        <span className={`badge ${
                          course.runningLevel === 'HIGH' ? 'red' : 
                          course.runningLevel === 'MEDIUM' ? 'amber' : 'green'
                        }`}>
                          {course.runningLevel === 'HIGH' ? '숲' : 
                           course.runningLevel === 'MEDIUM' ? '나무' : '새싹'}
                        </span>
                      </p>
                      <button className="detail-btn" onClick={() => navigate(`/course-detail/${course.id}`)}>상세보기</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* [우측] 지도 영역 */}
        <aside className="right-map-block-area">
          <div className="map-api-placeholder-box">
            <i className="fa-solid fa-map-location-dot map-placeholder-icon"></i>
            <p>kakao/google.map api로 대체될 예정입니다</p>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default Search;