import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import "../../css/LoginSearch.css";

const LoginSearch = () => {
  const navigate = useNavigate();
  
  // 상태 관리 (입력값 및 토글 알림)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // 비밀번호 재설정 제출 핸들러
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert("아이디와 이메일을 모두 입력해 주세요.");
      return;
    }
    
    // 임시 토글 알림 띄우기 (3초 후 자동으로 사라짐)
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/login"); // 로그인 페이지로 이동시키거나 유지
    }, 3000);
  };

  return (
    <div className="login-container-wrapper">
      {/* DB 미연동 상태를 위한 상단 커스텀 토글 알림창 */}
      {showAlert && (
        <div className="custom-alert-toggle animate-fade-in">
          💚 비밀번호가 성공적으로 재설정되었습니다!
        </div>
      )}

      <div className="login-main-card">
        
        {/* [좌측 배치] 기존 우측에 있던 안내 및 이동 패널 영역 */}
        <div className="login-side-panel left-side">
          <div className="panel-overlay-content">
            <h2>비밀번호를 잊으셨나요?</h2>
            <p>
              가입하신 아이디와 이메일을 입력하시면
              <br />
              안전하게 비밀번호를 재설정할 수 있습니다.
            </p>
            <button className="panel-outline-btn" onClick={() => navigate("/login")}>
              로그인으로 돌아가기
            </button>
            <button className="panel-outline-btn secondary" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </button>
          </div>
        </div>

        {/* [우측 배치] 아이디 / 이메일 입력 및 패스워드 재설정 폼 */}
        <div className="login-form-area right-side">
          <form onSubmit={handleResetPassword} className="login-core-form">
            <h2 className="form-main-title">비밀번호 찾기</h2>
            
            <div className="input-field-group">
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-text-input"
              />
            </div>

            <div className="input-field-group">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-text-input"
              />
            </div>

            <div className="form-action-rowsearch">
              <button type="submit" className="login-submit-btn">
                비밀번호 재설정
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginSearch;