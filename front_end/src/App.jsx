import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import CourseRecommendation from "./components/CourseRecommendation"; // 1. 러닝 코스 페이지
import SearchPage from "./components/SearchPage"; // 2. 독립된 검색 페이지
import CrewRecruitment from "./components/CrewRecruitment";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈 (메인페이지) */}
        <Route path="/" element={<MainPage />} />

        {/* 메뉴의 '러닝 코스' 전용 경로 */}
        <Route
          path="/course-recommendation"
          element={<CourseRecommendation />}
        />

        {/* 크루 모집 페이지 */}
        <Route path="/crew-recruitment" element={<CrewRecruitment />} />

        {/* 메인 검색 버튼 전용 독립 경로 */}
        <Route path="/search" element={<SearchPage />} />

        {/* 마이페이지 버튼 전용 독립 경로 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 로그인 버튼 전용 독립 경로 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 회원가입 전용 경로 */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
