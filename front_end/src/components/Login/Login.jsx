import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page-wrapper">
      <div className="container" id="container">
        {/* 로그인 폼 영역 */}
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>로그인</h1>
            <input type="email" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <a href="/LoginSearch">비밀번호를 잊으셨나요?</a>
            <button type="submit">로그인</button>
          </form>
        </div>

        {/* 안내 및 이동 패널 영역 (우측 고정) */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>처음이신가요?</h1>
              <p>회원가입하고 러닝 크루와 함께하세요.</p>
              {/* 기존에 작성해 두신 독립된 회원가입 페이지(/signup)로 이동 */}
              <button className="hidden" onClick={() => navigate("/signup")}>
                회원가입
              </button>
              <button className="hidden" onClick={() => navigate("/")}>
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
