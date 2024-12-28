import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import clearLogo from '../assets/clearLogo.png';
import '../styles/mainPage.css';
import RecordPage from './RecordPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav>
            <Link to="/main"><img src={clearLogo} alt="Logo" /></Link>{/* 로고 */}
            <Link to="#about">소개</Link>{/* 메뉴 항목 */}
            <Link to="#members">회원</Link>
            <Link to="/record">관리자</Link>
          </nav>
        </header>

        <Routes>
          {/* 페이지 라우팅 */}
          <Route path="/main" element={<mainPage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
