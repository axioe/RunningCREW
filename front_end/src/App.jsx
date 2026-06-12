import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Course from "./components/Course";
import Search from "./components/Search";
import Crew from "./components/Crew";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Page from "./components/MyPage";
import Post from "./components/Post";
import AdminPage from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈 (메인페이지) */}
        <Route path="/" element={<Main />} />

        {/* 메뉴의 '러닝 코스' 전용 경로 */}
        <Route path="/course-recommendation" element={<Course />} />

        {/* 크루 모집 페이지 */}
        <Route path="/crew-recruitment" element={<Crew />} />

        {/* 메인 검색 버튼 전용 독립 경로 */}
        <Route path="/search" element={<Search />} />

        {/* 마이페이지 버튼 전용 독립 경로 */}
        <Route path="/mypage" element={<Page />} />

        {/* /write 경로로 들어오면 CrewPostForm 컴포넌트를 보여주겠다고 설정 */}
        <Route path="/write" element={<Post />} />

        {/* 로그인 버튼 전용 독립 경로 */}
        <Route path="/login" element={<Login />} />

        {/* 회원가입 전용 경로 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 📌 관리자 페이지 전용 독립 경로 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
