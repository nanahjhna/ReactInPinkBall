import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes로 변경
import clearLogo from '../assets/clearLogo.png'; // 이미지 파일을 import
import '../styles/mainPage.css'; // CSS 파일 import
import RecordPage from './RecordPage'; // RecordPage 컴포넌트를 import

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav>
            {/* 로고 */}
            <a href="/main">
              <img src={clearLogo} alt="Logo" />
            </a>
            {/* 메뉴 항목 */}
            <a href="#about">소개</a>
            <a href="#members">회원</a>
            {/* 관리자를 눌렀을 때 RecordPage로 이동 */}
            <a href="/record">관리자</a>
          </nav>
        </header>

        <Routes>
          {/* 관리자 버튼을 누르면 RecordPage로 이동 */}
          <Route path="/main" element={<mainPage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
