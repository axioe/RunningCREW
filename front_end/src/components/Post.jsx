import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Post.css"; // Post.css 경로 매칭
import Header from "./common/Header"; // 프로젝트 공통 상단 GNB 헤더
import useAuthStore from "./common/useAuthStore";
import api from "../js/api";
import CourseModal from "./CourseModal";

const Post = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [timeNum, setTimeNum] = useState("12:00");
  const [ampm, setAmpm] = useState("AM");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState("새싹");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [facilityInfo, setFacilityInfo] = useState("");
  const [distance, setDistance] = useState(0.0);
  const [mvmFclty, setMvmFclty] = useState(false);
  const [cnvnncFclty, setCnvnncFclty] = useState(false);
  const [cltrFclty, setCltrFclty] = useState(false);
  const [open, setOpen] = useState(false);
  const [memberPeople, setMemberPeople] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState(false);

  // 주소 검색 열기
  const openPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("카카오 주소 API가 로드되지 않았습니다.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setSearch(true);
      },
    }).open();
  };

  const handleMapClick = () => {};
  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    if (
      window.confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")
    ) {
      navigate("/write");
    }
  };

  function toLocalDateTime(date, time, ampm) {
    let [hour, minute] = time.split(":").map(Number);

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");

    return `${date}T${hh}:${mm}:00`;
  }

  // 작성하기 버튼 클릭 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    let runningLevel = "LOW";
    if (difficulty === "나무") runningLevel = "MEDIUM";
    else if (difficulty === "숲") runningLevel = "HIGH";

    let info = "";
    if (mvmFclty) info = "운동시설";
    if (cnvnncFclty && info.length > 0) {
      info += "/";
      info += "편익 시설";
    }
    if (cltrFclty && info.length > 0) {
      info += "/";
      info += "문화시설";
    }
    setFacilityInfo(info);

    try {
      //  러닝코스 추가
      const res = await api.post("/running/", {
        spotName: location,
        latitude: latitude,
        longitude: longitude,
        address: address,
        facilityInfo: facilityInfo,
        runningLevel: runningLevel,
        distance: distance,
      });
      const course_id = res.data.id;
      const localDateTime = toLocalDateTime(date, timeNum, ampm);
      //console.log("course_id = " + course_id);
      //console.log("날짜시간 = " + localDateTime);
      //  크루 추가
      const crew_res = await api.post("/post/", {
        userId: user.id,
        title: title,
        content: content,
        maxPeople: memberPeople,
        courseId: course_id,
        appliedAt: localDateTime,
      });
      const crew_id = crew_res.data.id;
      //console.log("crew_id = " + crew_id);
      uploadImage(course_id);
      alert("작성 성공");
    } catch (e) {
      console.error(e);
      alert("작성 실패");
    }
  };

  const uploadImage = async (course_id) => {
    try {
      const formData = new FormData();

      formData.append("course_id", course_id);
      if (image) {
        formData.append("file", image);
      }

      const response = await api.post("/images_course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("이미지 등록 실패했습니다.");
    }
  };

  const handleSelectCourse = (course) => {
    setLocation(course.spotName);
    setAddress(course.address);
    let difficulty = "새싹";
    if (course.runningLevel === "MEDIUM") difficulty = "나무";
    else if (course.runningLevel === "HIGH") difficulty = "숲";
    setDifficulty(difficulty);
    setLatitude(course.latitude);
    setLongitude(course.longitude);
    setDistance(course.distance);
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");

    const fileInput = document.getElementById("imageUpload");
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const searchAddress = async (e) => {
    try {
      const response = await api.get(`/api/search?address=${address}`);
      if (response) {
        // console.log(response.data);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (search) {
      if (address) {
        searchAddress();
        setSearch(false);
      }
    }
  }, [search]);
  return (
    <div className="nature-runner-main-wrapper">
      {/* 상단 공통 네비게이션 헤더 */}
      <Header />

      {/* 메인 폼 컨테이너 (2단 분할 레이아웃 적용) */}
      <div className="post-form-container split-layout">
        {/* [좌측 구역] 입력 폼 서브 미션 */}
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
              placeholder="모집글 내용을 상세히 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* 이미지 등록 */}
          <div className="form-row">
            <label className="form-label fw-bold mb-2">러닝 코스 이미지</label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <label htmlFor="imageUpload" className="image-upload-box">
              {preview ? (
                <div className="preview-wrapper">
                  <img src={preview} alt="preview" className="preview-image" />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="upload-content">
                  <div className="upload-plus">+</div>
                  <div className="upload-title">이미지 등록</div>
                  <div className="upload-desc">
                    클릭하여 이미지를 선택하세요.
                  </div>
                </div>
              )}
            </label>
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
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="map-btn"
              >
                러닝 코스 검색
              </button>
              {open && (
                <CourseModal
                  setOpen={setOpen}
                  onSelectCourse={handleSelectCourse}
                />
              )}
            </div>
          </div>
          {/* 주소 */}
          <div className="form-row">
            <label htmlFor="location">주소</label>
            <div className="location-input-wrapper">
              <input
                type="text"
                id="address"
                className="form-input"
                placeholder="주소를 클릭해서 선택하세요."
                value={address}
                onChange={openPostcode}
                required
              />
              <button type="button" onClick={openPostcode} className="map-btn">
                주소 검색
              </button>
            </div>
          </div>

          {/* 경도/위도 */}
          <div className="form-row">
            <div className="checkbox-grid-layout">
              <label>경도</label>
              <label>위도</label>
            </div>
            <div className="time-picker-wrapper">
              <input
                type="text"
                placeholder="경도"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="form-input time-input"
                required
              />
              <input
                type="text"
                placeholder="위도"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="form-input time-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">인원수</label>
            <input
              type="number"
              min="1"
              max="100"
              className="form-input"
              value={memberPeople}
              onChange={(e) => setMemberPeople(e.target.value)}
              placeholder="인원수를 입력하세요."
            />
          </div>

          <div className="filter-group">
            <label>보유 시설</label>
            <div className="checkbox-grid-layout">
              <label>
                <input
                  type="checkbox"
                  checked={mvmFclty}
                  onChange={(e) => setMvmFclty(e.target.checked)}
                />{" "}
                운동시설
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cnvnncFclty}
                  onChange={(e) => setCnvnncFclty(e.target.checked)}
                />{" "}
                편익 시설
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cltrFclty}
                  onChange={(e) => setCltrFclty(e.target.checked)}
                />{" "}
                문화시설
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label>거리 (최대: {distance}km)</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              <span>1km</span>
              <span>20km+</span>
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
          <button
            type="submit"
            id="hidden-submit-trigger"
            style={{ display: "none" }}
          ></button>
        </form>

        {/* [우측 구역] 실시간 미리보기 & 액션 제어 사이드 바 */}
        <div className="form-right-sidebar">
          <div className="summary-box sticky-box">
            <h3>🏃‍♂️ 러닝 정보 미리보기</h3>
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
                <strong>거리: </strong> {distance} km
              </li>

              <li>
                <strong>인원수: </strong> {memberPeople}
              </li>
              <li>
                <strong>난이도: </strong>{" "}
                <span className="highlight-text">{difficulty}</span>
              </li>
            </ul>

            <div className="sidebar-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel full-width"
              >
                취소
              </button>
              <button
                type="button"
                className="btn-submit full-width"
                onClick={() => {
                  document.getElementById("hidden-submit-trigger").click();
                }}
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
