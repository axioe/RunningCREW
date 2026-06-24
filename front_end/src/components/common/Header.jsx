import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Header.css";
import useAuthStore from "./useAuthStore";

const Header = () => {
  const navigate = useNavigate();
  
  const token = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

 // console.log("token : " + token);
  const logoutProc = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="main-gnb-header">
      {/* 1. 이 'header-inner'가 정렬의 핵심입니다. */}
      <div className="header-inner">
        {/* 로고 영역 */}
        <div className="logo-area" onClick={() => navigate("/")}>
          <span className="logo-green-text">Running</span> Crew
        </div>

        {/* 메뉴 영역 */}
        <nav className="nav-menu-bar">
          <button className="menu-btn" onClick={() => navigate("/")}>
            홈
          </button>
          <button className="menu-btn" onClick={() => navigate("/search")}>
            검색
          </button>
          <button className="menu-btn" onClick={() => navigate("/course")}>
            러닝 코스
          </button>
          <button className="menu-btn" onClick={() => navigate("/crew")}>
            크루 모집
          </button>
          <button className="menu-btn" onClick={() => navigate("/safety")}>
            실시간 재난 속보
          </button>
        {token &&(
          <button className="menu-btn" onClick={() => navigate("/mypage")}>
            마이페이지
          </button>
        )}
        </nav>


        {/* 로그인/회원가입 버튼 영역 */}
        <div className="gnb-user-actions">
          {token ? (
            <>
              <button className="gnb-login-btn" onClick={logoutProc}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="gnb-login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="gnb-signup-btn"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
