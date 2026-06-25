import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main.jsx";
import Course from "./components/Course.jsx";
import Search from "./components/Search.jsx";
import Crew from "./components/Crew.jsx";
import Login from "./components/login/Login.jsx";
import SignUp from "./components/login/SignUp.jsx";
import MyPage from "./components/MyPage.jsx";
import Post from "./components/Post.jsx";
import LoginSearch from "./components/login/LoginSearch.jsx";
import CourseDetail from "./components/CourseDetail.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import useAuthStore from "./components/common/useAuthStore.jsx";
import PublicSafety from "./components/PublicSafety.jsx";
import MyPostDetail from "./components/MyPage/MyPostDetail.jsx";

function App() {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;

  return (
    <Router>
      <Routes>
        {/* 홈 (메인페이지) */}
        <Route path="/" element={<Main />} />

        {/* 메뉴의 '러닝 코스' 전용 경로 */}
        <Route path="/course" element={<Course />} />

        {/* 크루 모집 페이지 */}
        <Route path="/crew" element={<Crew />} />

        {/* 메인 검색 버튼 전용 독립 경로 */}
        <Route path="/search" element={<Search />} />

        {/* 마이페이지 버튼 전용 독립 경로 */}
        <Route path="/mypage" element={<MyPage />} />
        {/* 게시글 상세 페이지 (신청자 관리 포함) */}
        <Route path="/post/detail/:id" element={<MyPostDetail />} />

        {/* 러닝 코스 상세 페이지 */}
        <Route path="/course-detail" element={<CourseDetail />} />

        {/* 글쓰기 페이지 */}
        <Route path="/write" element={<Post />} />

        {/* 로그인 버튼 전용 독립 경로 */}
        <Route path="/login" element={<Login />} />

        {/* 비밀번호 찾기 페이지 */}
        <Route path="/LoginSearch" element={<LoginSearch />} />

        {/* 회원가입 전용 경로 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 재난안전 전용 경로 */}
        <Route path="/safety" element={<PublicSafety/>} />

        {/* 관리자 페이지 전용 독립 경로 */}
        <Route
          path="/adminMain"
          element={
            user?.role &&(
              user.role.toUpperCase() === "ROLE_ADMIN" ||
              user.role.toUpperCase() === "ADMIN"
            )?(
              <AdminPage/>
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
