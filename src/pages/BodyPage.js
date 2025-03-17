import React, { useState } from 'react';
import MainPage from './mainPage'; // mainPage.js 파일에서 MainPage 컴포넌트를 불러옵니다.
//react-router-dom 버전 6부터는 Switch 컴포넌트 대신 Routes 컴포넌트를 사용해야 합니다.
// react-router-dom 추가
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecordPage from './RecordPage'; // RecordPage.js 파일에서 RecordPage 컴포넌트를 불러옵니다.
import TeamRecordPage from './TeamRecordPage'; // TeamRecordPage.js 파일에서 RecordPage 컴포넌트를 불러옵니다.
import clearLogo from '../assets/clearLogo.png'; // 로고 이미지 파일 import
import '../styles/BodyPage.css'; // 스타일 파일 import
import { TeamDataProvider } from '../context/TeamDataContext'; // Context 불러오기

// Header Component: 웹 페이지의 상단 헤더를 렌더링합니다.
const Header = ({ setCurrentPage }) => (
  <header className="header">
    <nav>
      <Link to="/"><img src={clearLogo} alt="Logo" /> {/* 로고 클릭 시 main 페이지로 이동 */}</Link>
      <Link to="/RecordPage">기록출력</Link> {/* 'record' 페이지로 이동 */}
      <Link to="/TeamRecordPage">팀기록출력</Link> {/* 'TeamRecordPage' 페이지로 이동 */}
    </nav>
  </header>
);

// Footer Component: 웹 페이지의 하단 푸터를 렌더링합니다.
const Footer = () => (
  <footer className="footer">
    <p>&copy; COPYRIGHT ⓒ 2002 KOREA PINK BALL TOKYO SOCCER CLUB. ALL RIGHTS RESERVED</p>
  </footer>
);

// Main Body Component: 전달된 Component를 렌더링하는 메인 콘텐츠 영역입니다.
const Body = ({ Component }) => (
  <main style={{ padding: '20px', minHeight: '400px' }}>
    <Component />
  </main>
);

// App Component: 전체 애플리케이션 구조를 정의합니다.
const App = () => {
  const [currentPage, setCurrentPage] = useState('main'); // 현재 페이지 상태 (기본값: 'main')

  // 페이지 컴포넌트 매핑 (현재는 MainPage만)
  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return MainPage;
      case 'RecordPage':
        return RecordPage;
      case 'TeamRecordPage':
        return TeamRecordPage;
      // 다른 페이지 추가 가능
      default:
        return () => <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <TeamDataProvider> {/* Context Provider로 감싸기 */}
        {/* Router로 전체 애플리케이션을 감쌉니다. */}
        <Router>
          <Header />
          <main style={{ padding: '20px', minHeight: '400px' }}>
            {/* Routes로 변경 */}
            <Routes>
              <Route path="/" element={<MainPage />} /> {/* 기본 경로에서 MainPage 렌더링 */}
              <Route path="/RecordPage" element={<RecordPage />} /> {/* /record 경로에서 RecordPage 렌더링 */}
              <Route path="/TeamRecordPage" element={<TeamRecordPage />} /> {/* /TeamRecordPage 경로에서 RecordPage 렌더링 */}
              {/* 추가 페이지가 있을 경우 Route 추가 가능 */}
            </Routes>
          </main>
          <Footer />
        </Router>
      </TeamDataProvider>
    </div>
  );
};

export default App;
