import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/CourseDetail.css";
import Header from "./common/Header";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에 매핑된 데이터 인덱스 번호
  const location = useLocation();

  // 상태 관리 정의
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 주소창 URL에서 ?district=성동구 와 같은 쿼리스트링 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const district = searchParams.get("district") || "성동구"; // 기본값 예외 처리

  useEffect(() => {
    const fetchDetailInfo = async () => {
      setLoading(true);
      try {
        // 목록 페이지와 동일하게 해당 자치구의 데이터를 백엔드 공공 API에 요청
        const response = await axios.get("/api/public_park", {
          params: {
            pageNo: 1,
            numOfRows: 50, // 상세 정보를 찾기 위해 넉넉하게 목록 조회
            instt_nm: `서울특별시 ${district}`.trim()
          }
        });

        const items = response.data?.response?.body?.items || [];
        
        // useParams로 가져온 id값과 일치하는 순서의 데이터를 배열에서 매칭
        // 리액트 라우터 파라미터는 문자열이므로 숫자로 변환 후 인덱스 비교
        const targetIndex = Number(id) - 1; 
        const selectedItem = items[targetIndex];

        if (selectedItem) {
          // 공공데이터 규격 DTO에 맞추어 상세페이지 데이터 객체 재조립
          setCourseInfo({
            title: selectedItem.parkNm,
            location: selectedItem.lnmadr || "등록된 주소 정보가 없습니다.",
            // 공원 구분 및 보유 시설을 기반으로 실시간 태그 클라우드 생성
            tags: [
              selectedItem.parkSe, 
              selectedItem.mvmFclty ? "운동시설 있음" : null,
              selectedItem.cnvnncFclty ? "편익시설 있음" : null
            ].filter(Boolean),
            description: `[보유 시설 세부 안내]\n` + 
                         `- 운동시설: ${selectedItem.mvmFclty || "없음"}\n` +
                         `- 편익시설: ${selectedItem.cnvnncFclty || "없음"}\n` +
                         `- 교양/문화시설: ${selectedItem.cltrFclty || "없음"}\n\n` +
                         `관리기관 연락처: ${selectedItem.phoneNumber || "정보 없음"}`,
            imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600"
          });
        } else {
          setCourseInfo(null);
        }
      } catch (error) {
        console.error("코스 상세 정보 로드 실패:", error);
        setCourseInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailInfo();
  }, [id, district]);

  // 로딩 상태 레이아웃
  if (loading) {
    return (
      <div className="course-detail-global-wrapper">
        <Header />
        <div style={{ textAlign: "center", padding: "150px 0", color: "#16A34A", fontWeight: "bold" }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "10px" }}></i>
          <p>상세 데이터를 실시간으로 가져오는 중입니다...</p>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때의 예외 처리 레이아웃
  if (!courseInfo) {
    return (
      <div className="course-detail-global-wrapper">
        <Header />
        <div style={{ textAlign: "center", padding: "150px 0", color: "#94a3b8" }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: "40px", marginBottom: "15px", color: "#cbd5e1" }}></i>
          <p>해당 코스의 상세 데이터를 찾을 수 없거나 데이터베이스가 비어있습니다.</p>
          <button className="btn-back-list" style={{ marginTop: "20px", float: "none" }} onClick={() => navigate(-1)}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 정상 데이터 렌더링 구역
  return (
    <div className="course-detail-global-wrapper">
      <Header />
      
      <div className="detail-container-inner">
        <div className="detail-main-card">
          
          {/* [좌측 패널] API 실시간 이미지 및 타이틀 바인딩 */}
          <div 
            className="detail-visual-panel" 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${courseInfo.imageUrl})` }}
          >
            <div className="visual-overlay-content">
              <span className="detail-badge-pill green">
                공공 체육 장소
              </span>
              <h2>{courseInfo.title}</h2>
              <p><i className="fa-solid fa-location-dot"></i> {courseInfo.location}</p>
            </div>
          </div>

          {/* [우측 영역] 코스 상세 정보 스펙 */}
          <div className="detail-info-area">
            <div className="info-content-scroll">
              <h3 className="info-section-title">코스 상세 정보</h3>
              
              <div className="spec-grid-container">
                <div className="spec-item">
                  <span className="spec-label">장소 유형</span>
                  <span className="spec-value" style={{ fontSize: "15px" }}>자연 공원 인프라</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">추천 활동</span>
                  <span className="spec-value" style={{ fontSize: "15px" }}>야외 러닝 / 워킹</span>
                </div>
              </div>

              <div className="description-box">
                <h4>시설 및 코스 소개</h4>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{courseInfo.description}</p>
              </div>

              <div className="tag-cloud">
                {courseInfo.tags.map((tag, index) => (
                  <span key={index} className="detail-tag">#{tag}</span>
                ))}
              </div>

              <div className="detail-action-buttons">
                <button className="btn-back-list" onClick={() => navigate(-1)}>
                  목록으로 돌아가기
                </button>
                <button className="btn-join-crew" onClick={() => alert("해당 공원 코스의 크루 모집 페이지 연동 준비 중입니다!")}>
                  크루 참여하기
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;