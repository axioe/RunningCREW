import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Header.css';

const Header = () => {
  const navigate = useNavigate();

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
          <button className="menu-btn" onClick={() => navigate("/")}>홈</button>
          <button className="menu-btn" onClick={() => navigate("/search")}>검색</button>
          <button className="menu-btn" onClick={() => navigate("/course")}>러닝 코스</button>
          <button className="menu-btn" onClick={() => navigate("/crew")}>크루 모집</button>
          <button className="menu-btn" onClick={() => navigate("/mypage")}>마이페이지</button>
        </nav>
        
        {/* 로그인/회원가입 버튼 영역 */}
        <div className="gnb-user-actions">
          <button className="gnb-login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="gnb-signup-btn" onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default Header;