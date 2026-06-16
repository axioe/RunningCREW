import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import api from "../../js/api";
import useAuthStore from "../common/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginProc = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userId = formData.get("userId");
      const password = formData.get("password");

      // 임시 admin 테스트 계정 생성
      if (userId === "admin" && password === "1234") {
        const fakeToken = "Bearer fake-jwt-token-for-admin";
        const fakeUserRole = "ADMIN";

        login({ id: userId, role: fakeUserRole }, fakeToken);
        alert("[테스트]관리자 계정 로그인.");
        navigate("/adminMain");
        return;
      }

      const res = await api.post("/login", {
        userId: userId,
        password: password,
      });
      const token = res.headers.authorization;
      const userRole = res.data.roleType;
      const id = res.data.id;

      console.log("토큰: ", token);
      console.log("유저 권한: ", userRole);
      console.log("id: ", id);

      login({ userId: userId, role: userRole, id:id }, token);

      if (userRole === "ADMIN") {
        alert("관리자 계정으로 로그인 성공.");
        navigate("/adminMain");
      } else {
        alert("로그인이 완료되었습니다.");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="container" id="container">
        {/* 로그인 폼 영역 */}
        <div className="form-container sign-in">
          <form onSubmit={loginProc}>
            <h1>로그인</h1>
            <input type="text" name="userId" placeholder="아이디" />
            <input type="password" name="password" placeholder="비밀번호" />
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
