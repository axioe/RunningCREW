import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // 디자인 통일감을 위해 메인 CSS 활용
import "../css/AdminPage.css"; // 관리자 전용 테이블/레이아웃 스타일

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("crew"); // 'crew', 'user', 'account'

  // 가상 데이터 (추후 DB/API 연동)
  const [crews, setCrews] = useState([
    {
      id: 1,
      title: "반포 고수부지 거북이들",
      leader: "김러너",
      region: "강남구",
    },
    { id: 2, title: "여의도 새벽 질주", leader: "이한강", region: "영등포구" },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      userId: "runner123",
      nickname: "스피드왕",
      email: "runner@email.com",
    },
    {
      id: 2,
      userId: "nature_run",
      nickname: "자연러너",
      email: "nature@email.com",
    },
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, adminId: "admin_master", name: "최고관리자", role: "총괄" },
    { id: 2, adminId: "admin_crew", name: "크루매니저", role: "콘텐츠관리" },
  ]);

  // 간단한 삭제 기능 (CRUD 중 Delete 예시)
  const handleDeleteCrew = (id) => {
    if (window.confirm("해당 크루 모집글을 삭제하시겠습니까?")) {
      setCrews(crews.filter((crew) => crew.id !== id));
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("해당 유저를 탈퇴 처리하시겠습니까?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="login-page-wrapper admin-page-wrapper">
      <div className="container admin-container">
        {/* 좌측 사이드바 탭 제어 (디자인 톤앤매너 매칭) */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Nature Runner 관리자</p>
          </div>
          <div className="sidebar-menu">
            <button
              className={activeTab === "crew" ? "active" : ""}
              onClick={() => setActiveTab("crew")}
            >
              <i className="fa-solid fa-list-check"></i> 크루 모집글 관리
            </button>

            <button
              className={activeTab === "user" ? "active" : ""}
              onClick={() => setActiveTab("user")}
            >
              <i className="fa-solid fa-users-gear"></i> 유저 관리
            </button>

            <button
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              <i className="fa-solid fa-user-shield"></i> 관리자 계정 관리
            </button>
          </div>
          
          {/* 하단 뒤로가기 버튼 정돈 */}
          <div className="sidebar-footer">
            <button 
              className="mypage-submit-btn" 
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "13px", 
                backgroundColor: "#fff", 
                color: "#10B981", 
                border: "1px solid #10B981",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer"
              }} 
              onClick={() => navigate("/mypage")}
            >
              <i className="fa-solid fa-arrow-left me-1"></i> 마이페이지로 복귀
            </button>
          </div>
        </div>

        {/* 우측 메인 콘텐츠 영역 (CRUD 데이터 보임) */}
        <div className="admin-content-area">
          {/* 1. 크루 모집글 관리 탭 */}
          {activeTab === "crew" && (
            <div className="admin-card-inner">
              <div className="content-header">
                <h3>
                  크루 모집글 관리{" "}
                  <span className="count-tag">{crews.length}</span>
                </h3>
                <button
                  className="btn-admin-add"
                  onClick={() => alert("새 모집글 등록 폼 오픈")}
                >
                  모집글 강제 등록
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>모집글 제목</th>
                    <th>개설자(리더)</th>
                    <th>지역</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {crews.map((crew) => (
                    <tr key={crew.id}>
                      <td>{crew.id}</td>
                      <td className="text-left">
                        <strong>{crew.title}</strong>
                      </td>
                      <td>{crew.leader}</td>
                      <td>{crew.region}</td>
                      <td>
                        <button
                          className="btn-table-delete"
                          onClick={() => handleDeleteCrew(crew.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. 유저 관리 탭 */}
          {activeTab === "user" && (
            <div className="admin-card-inner">
              <div className="content-header">
                <h3>
                  유저 관리 <span className="count-tag">{users.length}</span>
                </h3>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>이메일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.userId}</td>
                      <td>{user.nickname}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn-table-delete"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          추방
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. 관리자 계정 관리 탭 */}
          {activeTab === "account" && (
            <div className="admin-card-inner">
              <div className="content-header">
                <h3>
                  관리자 계정 관리{" "}
                  <span className="count-tag">{admins.length}</span>
                </h3>
                <button
                  className="btn-admin-add"
                  onClick={() => alert("관리자 추가 폼 오픈")}
                >
                  관리자 등록
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>관리자 ID</th>
                    <th>이름</th>
                    <th>권한 등급</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>
                        <strong>{admin.adminId}</strong>
                      </td>
                      <td>{admin.name}</td>
                      <td>
                        <span className="crew-level-tag">{admin.role}</span>
                      </td>
                      <td>
                        <span style={{ color: "#10B981", fontWeight: "bold" }}>
                          활성화
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;