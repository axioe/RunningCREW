import React from "react";
// 라우터를 구동하기 위해 필요한 BrowserRouter 컴포넌트를 불러옵니다.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx"; 

function App() {
  return (
    // useNavigate()를 쓰는 컴포넌트는 반드시 최상단에서 <Router>로 감싸주어야 합니다.
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 메인 경로('/')일 때 MainPage 컴포넌트가 나오도록 라우팅 설정 */}
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;