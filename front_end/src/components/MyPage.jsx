import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";
import Header from "./common/Header";
import MyPost from "./MyPage/MyPost";
import TabContent from "./MyPage/TabContent";

const MyPage = () => {
  const navigate = useNavigate();

  // 현재 활성화된 서브 메뉴 탭 상태 관리 ('profile', 'crew', 'bookmark', 'post')
  const [activeTab, setActiveTab] = useState("profile");

  // 임시 데이터 (기존 페이지 톤앤매너 매칭용)
  const [userProfile, setUserProfile] = useState({
    nickname: "러닝이",
    email: "runner@naturerunner.com",
    role: "소프트웨어 개발자",
  });

  return (
    <div className="nature-runner-main-wrapper nature-runner-mypage-wrapper">
      {/* 1. 상단 GNB 영역 */}
      <header className="main-gnb-header">
        <div className="logo-area" onClick={() => navigate("/")}>
          <span className="logo-green-text">Nature</span> Runner
        </div>
        <nav className="nav-menu-bar">
          <button className="menu-btn" onClick={() => navigate("/")}>
            홈
          </button>
          <button
            className="menu-btn"
            onClick={() => navigate("/course-recommendation")}
          >
            러닝 코스
          </button>
          <button
            className="menu-btn"
            onClick={() => navigate("/crew-recruitment")}
          >
            크루 모집
          </button>
          <button
            className="menu-btn active"
            onClick={() => navigate("/mypage")}
          >
            마이페이지
          </button>
        </nav>
      </header>

      {/* 2. 메인 바디 (2단 분할 레이아웃) */}
      <div className="mypage-container">
        {/* [본문 좌측 섹션: 프로필 카드 & 서브 메뉴] */}
        <aside className="mypage-sidebar">
          <div className="sidebar-profile-card">
            <div className="profile-avatar">
              {/* 기본 아바타 아이콘 대체용 placeholder */}
              <div className="avatar-placeholder">🏃‍♂️</div>
            </div>
            <h3 className="profile-nickname">{userProfile.nickname}</h3>
            <span className="profile-role-tag">{userProfile.role}</span>
          </div>

          <nav className="sidebar-menu-list">
            <button
              className={`sidebar-menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              내 정보 관리
            </button>
            <button
              className={`sidebar-menu-item ${activeTab === "crew" ? "active" : ""}`}
              onClick={() => setActiveTab("crew")}
            >
              내 러닝 크루 현황
            </button>
            <button
              className={`sidebar-menu-item ${activeTab === "bookmark" ? "active" : ""}`}
              onClick={() => setActiveTab("bookmark")}
            >
              북마크한 러닝 코스
            </button>
            <button
              className={`sidebar-menu-item ${activeTab === "post" ? "active" : ""}`}
              onClick={() => setActiveTab("post")}
            >
              내가 작성한 글
            </button>

            {/* --- [추가 코드] 내가 작성한 글 아래 관리자 이동 버튼 영역 --- */}
            <div
              className="admin-redirect-divider"
              style={{ margin: "15px 0", borderTop: "1px dashed #e5e7eb" }}
            ></div>
            <button
              className="sidebar-menu-item admin-move-btn"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.06)",
                color: "#10B981",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                borderRadius: "10px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
              onClick={() => navigate("/admin")}
            >
              <i className="fa-solid fa-user-gear"></i> 관리자 페이지 이동
            </button>
            {/* -------------------------------------------------------- */}
          </nav>
        </aside>

        {/* [본문 우측 섹션: 메인 대시보드 콘텐츠] */}
        <main className="mypage-content-area">
          {/* 탭 1: 내 정보 관리 (프로필 수정 폼 + 통계 요약) */}
          {activeTab === "profile" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">내 정보 관리</h2>

              {/* 러닝 통계 요약 위젯 */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">이번 달 달린 거리</span>
                  <div className="stat-value">
                    42.5 <span className="stat-unit">km</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">이번 달 러닝 시간</span>
                  <div className="stat-value">4시간 18분</div>
                </div>
              </div>

              {/* 프로필 수정 폼 */}
              <div className="mypage-form-card">
                <div className="form-group">
                  <label>닉네임</label>
                  <input
                    type="text"
                    className="mypage-input"
                    value={userProfile.nickname}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        nickname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    className="mypage-input"
                    value={userProfile.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호 변경</label>
                  <input
                    type="password"
                    className="mypage-input"
                    placeholder="새로운 비밀번호를 입력하세요"
                  />
                </div>
                <button className="mypage-submit-btn">정보 수정 완료</button>
              </div>
            </div>
          )}

          {/* 탭 2: 내 러닝 크루 현황 */}
          {activeTab === "crew" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">내 러닝 크루 현황</h2>

              <div className="crew-list-container">
                <table className="crew-status-table">
                  <thead>
                    <tr>
                      <th>크루명</th>
                      <th>활동 지역</th>
                      <th>레벨</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="crew-name-cell">한강 여명 크루</td>
                      <td>서울 여의도</td>
                      <td>
                        <span className="crew-level-tag level-beginner">
                          새싹
                        </span>
                      </td>
                      <td>
                        <span className="status-badge badge-success">
                          참여 중
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="crew-name-cell">남산 서밋 크루</td>
                      <td>서울 용산</td>
                      <td>
                        <span className="crew-level-tag level-advanced">
                          나무
                        </span>
                      </td>
                      <td>
                        <span className="status-badge badge-waiting">
                          수락 대기 중
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 탭 3: 북마크한 러닝 코스 */}
          {activeTab === "bookmark" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">북마크한 러닝 코스</h2>
              <div className="bookmark-grid">
                {/* 예시 코스 카드 1 */}
                <div className="bookmark-course-card">
                  <div className="course-thumb-placeholder">🌲</div>
                  <div className="course-info">
                    <h4>양재천 메타세쿼이아 길 코스</h4>
                    <p>거리: 5.2km | 소요시간: 35분</p>
                  </div>
                </div>
                {/* 예시 코스 카드 2 */}
                <div className="bookmark-course-card">
                  <div className="course-thumb-placeholder">🌊</div>
                  <div className="course-info">
                    <h4>부산 광안리 해변 감성 코스</h4>
                    <p>거리: 3.8km | 소요시간: 25분</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 탭 4: 내가 작성한 글 */}
          {activeTab === "post" && <MyPost />}
        </main>
      </div>
    </div>
  );
};

export default MyPage;
