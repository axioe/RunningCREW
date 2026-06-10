import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage"; 
import SearchPage from "./components/SearchPage"; 
import CourseRecommendation from "./components/CourseRecommendation"; // 1. 임포트 추가

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* 2. 코스 추천 페이지 라우트 등록 */}
          <Route path="/course-recommendation" element={<CourseRecommendation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;