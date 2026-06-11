import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CrewPostForm.css"
import Header from "./common/Header";

const CrewPostForm = () => {
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
    if (window.confirm("취소하시겠습니까?")) {
      alert("취소가 완료되었습니다.");
      // 추후 원래 화면이나 메인으로 이동하는 로직 추가 가능
    }
  };

  // 작성하기 버튼 클릭 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("DB 준비 중입니다.");
  };

  return (
    <div className="form-container">
      <h2>크루 모집글 작성하기</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 내용 */}
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            placeholder="모집글 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* 날짜 (직접 입력 및 달력 아이콘 클릭 모두 지원) */}
        <div className="form-group">
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

        {/* 시간 (12시 기준 + AM/PM) */}
        <div className="form-group">
          <label>시간</label>
          <div className="time-picker-wrapper">
            <input
              type="text"
              placeholder="12:00"
              value={timeNum}
              onChange={(e) => setTimeNum(e.target.value)}
              className="time-input"
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
        <div className="form-group">
          <label htmlFor="location">장소</label>
          <div className="location-input-wrapper">
            <input
              type="text"
              id="location"
              placeholder="장소를 입력해 주세요."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button type="button" onClick={handleMapClick} className="map-btn">
              지도 보기
            </button>
          </div>
        </div>

        {/* 난이도 선택 */}
        <div className="form-group">
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

        {/* 러닝 정보 요약 */}
        <div className="summary-box">
          <h3>🏃‍♂️ 러닝 정보 요약</h3>
          <ul>
            <li>
              <strong>날짜: </strong> {date || "미정"}
            </li>
            <li>
              <strong>시간: </strong> {ampm} {timeNum || "12:00"}
            </li>
            <li>
              <strong>장소: </strong> {location || "미정"}
            </li>
            <li>
              <strong>난이도: </strong> {difficulty}
            </li>
          </ul>
        </div>

        {/* 하단 버튼 구역 */}
        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-btn">
            취소
          </button>
          <button type="submit" className="submit-btn">
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrewPostForm;
