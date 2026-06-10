import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import Header from "./common/Header";

const LoginPage = () => {
  const navigate = useNavigate();

  // 1. 로그인 데이터 상태 관리
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  // 2. 비밀번호 보기 토글 상태
  const [showPassword, setShowPassword] = useState(false);

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    alert("로그인 기능은 현재 준비 중입니다 (DB 연동 전).");
    // 성공 시 navigate("/") 로 이동 처리 예정
  };

  return (
    <div className="nature-runner-login-wrapper">

      <Header/>

      {/* --- 중앙 정렬 로그인 폼 섹션 --- */}
      <main className="login-centered-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome!</h2>
            <p>Nature Runner와 함께 다시 달려볼까요?</p>
          </div>

          <form className="login-form-body" onSubmit={handleLogin}>
            {/* 아이디 입력 */}
            <div className="login-input-box">
              <i className="fa-regular fa-user"></i>
              <input 
                type="text" 
                name="userId" 
                value={loginData.userId} 
                onChange={handleChange} 
                placeholder="아이디를 입력해주세요" 
                required 
              />
            </div>

            {/* 비밀번호 입력 (시아 버튼 포함) */}
            <div className="login-input-box password-box">
              <i className="fa-solid fa-lock"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={loginData.password} 
                onChange={handleChange} 
                placeholder="비밀번호를 입력해주세요" 
                required 
              />
              <button 
                type="button" 
                className="login-pw-eye" 
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
              </button>
            </div>

            {/* 아이디/비밀번호 찾기 */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" /> 로그인 상태 유지
              </label>
              <div className="find-links">
                <span>아이디 찾기</span> | <span>비밀번호 찾기</span>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button type="submit" className="btn-login-submit">로그인</button>
          </form>

          {/* 하단 회원가입 유도 */}
          <div className="login-footer">
            <span>아직 계정이 없으신가요?</span>
            <button onClick={() => navigate("/signup")}>회원가입 하기</button>
          </div>

          {/* 소셜 로그인 구분선 (선택사항) */}
          <div className="social-divider">
            <span>간편 로그인</span>
          </div>

          <div className="social-login-group">
            <button className="social-btn kakao"><i className="fa-solid fa-comment"></i></button>
            <button className="social-btn naver">N</button>
            <button className="social-btn google"><i className="fa-brands fa-google"></i></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;