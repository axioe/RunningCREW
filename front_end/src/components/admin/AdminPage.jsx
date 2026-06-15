import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css"; 
import "../../css/Admin.css"; 
// 분할한 하위 컴포넌트들을 import 합니다.
import AdminCrews from "./AdminCrew";
import AdminUser from "./AdminUser";
import AdminID from "./AdminID";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("crew"); // 'crew', 'user', 'account'

  return (
    <div className="login-page-wrapper admin-page-wrapper">
      <div className="container admin-container">
        
        {/* 좌측 사이드바 영역 */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Nature Runner 관리자</p>
          </div>
          
          <div className="sidebar-menu">
            {/* activeTab 매칭 조건에 따라 초록색 하이라이트 CSS 적용 */}
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
                cursor: "pointer",
              }}
              onClick={() => navigate("/mypage")}
            >
              <i className="fa-solid fa-arrow-left me-1"></i> 마이페이지로 복귀
            </button>
          </div>
        </div>

        {/* 우측 메인 콘텐츠 영역: activeTab에 맞춰 컴포넌트를 동적으로 렌더링 */}
        <div className="admin-content-area">
          {activeTab === "crew" && <AdminCrews />}
          {activeTab === "user" && <AdminUser />}
          {activeTab === "account" && <AdminID />}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;