import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Post.css"; // Post.css 경로 매칭
import Header from "./common/Header"; // 프로젝트 공통 상단 GNB 헤더

const Post = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [timeNum, setTimeNum] = useState("12:00");
  const [ampm, setAmpm] = useState("AM");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState("새싹");

  // 지도 API 버튼 클릭 핸들러
  const handleMapClick = () => {
    alert("API 연동 준비 중입니다.");
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      navigate("/"); 
    }
  };

  // 작성하기 버튼 클릭 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("DB 준비 중입니다.");
    console.log({ title, content, date, time: `${ampm} ${timeNum}`, location, difficulty });
  };

  return (
    <div className="nature-runner-main-wrapper">
      {/* 상단 공통 네비게이션 헤더 */}
      <Header />

      {/* 메인 폼 컨테이너 (2단 분할 레이아웃 적용) */}
      <div className="post-form-container split-layout">
        
        {/* [좌측 구역] 입력 폼 서브미션 */}
        <form onSubmit={handleSubmit} className="form-left-section">
          <div className="form-header">
            <h2>크루 모집글 작성하기</h2>
            <p>함께 달릴 네이처 러너 크루원들을 모아보세요.</p>
          </div>

          {/* 제목 */}
          <div className="form-row">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 내용 */}
          <div className="form-row">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              className="form-textarea"
              placeholder="모집글 내용을 상세히 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* 날짜 */}
          <div className="form-row">
            <label htmlFor="date">날짜</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 시간 */}
          <div className="form-row">
            <label>시간</label>
            <div className="time-picker-wrapper">
              <input
                type="text"
                placeholder="12:00"
                value={timeNum}
                onChange={(e) => setTimeNum(e.target.value)}
                className="form-input time-input"
                required
              />
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="ampm-select"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* 장소 */}
          <div className="form-row">
            <label htmlFor="location">장소</label>
            <div className="location-input-wrapper">
              <input
                type="text"
                id="location"
                className="form-input"
                placeholder="모집 장소를 입력해 주세요."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <button type="button" onClick={handleMapClick} className="map-btn">
                지도 보기
              </button>
            </div>
          </div>

          {/* 난이도 */}
          <div className="form-row">
            <label>난이도</label>
            <div className="difficulty-btn-group">
              {["새싹", "나무", "숲"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`diff-btn ${difficulty === level ? "active" : ""}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          {/* HTML5 유효성 검사를 작동시키기 위해 실제 form 내부에 숨겨둔 전송 트리거 */}
          <button type="submit" id="hidden-submit-trigger" style={{ display: "none" }}></button>
        </form>

        {/* [우측 구역] 실시간 미리보기 & 액션 제어 사이드바 */}
        <div className="form-right-sidebar">
          <div className="summary-box sticky-box">
            <h3>🏃‍♂️ 러닝 정보 미리보기</h3>
            <ul>
              <li>
                <strong>날짜 :</strong> {date || "미정"}
              </li>
              <li>
                <strong>시간 :</strong> {ampm} {timeNum || "12:00"}
              </li>
              <li>
                <strong>장소 :</strong> {location || "미정"}
              </li>
              <li>
                <strong>난이도 :</strong> <span className="highlight-text">{difficulty}</span>
              </li>
            </ul>

            {/* 버튼 그룹을 미리보기 카드 하단으로 일체화 디자인 */}
            <div className="sidebar-actions">
              <button type="button" onClick={handleCancel} className="btn-cancel full-width">
                취소
              </button>
              <button 
                type="button" 
                className="btn-submit full-width"
                onClick={() => document.getElementById("hidden-submit-trigger").click()}
              >
                작성하기
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Post;