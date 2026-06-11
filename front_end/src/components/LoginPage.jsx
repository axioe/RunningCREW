import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 가져오기
import '../css/LoginPage.css';

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // 2. 네비게이트 함수 선언

  return (
    <div className="login-page-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        
        {/* 회원가입 폼 */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>회원가입</h1>
            <input type="text" placeholder="닉네임" />
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <button type="submit">가입하기</button>
          </form>
        </div>

        {/* 로그인 폼 */}
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>로그인</h1>
            <input type="email" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <a href="#">비밀번호를 잊으셨나요?</a>
            <button type="submit">로그인</button>
          </form>
        </div>

        {/* 토글 패널 */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>반갑습니다!</h1>
              <p>계정이 있다면 지금 로그인하세요.</p>
              <button className="hidden" onClick={() => setIsActive(false)}>로그인</button>
              {/* 3. 홈으로 이동하는 함수 연결 */}
              <button className="hidden" onClick={() => navigate("/")}>홈으로 돌아가기</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>처음이신가요?</h1>
              <p>회원가입하고 러닝 크루와 함께하세요.</p>
              <button className="hidden" onClick={() => setIsActive(true)}>회원가입</button>
              {/* 3. 홈으로 이동하는 함수 연결 */}
              <button className="hidden" onClick={() => navigate("/")}>홈으로 돌아가기</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;