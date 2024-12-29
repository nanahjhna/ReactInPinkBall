import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import clearLogo from '../assets/clearLogo.png';
import '../styles/mainPage.css';
import RecordPage from './RecordPage';
import { gapi } from "gapi-script";

// Google Sheets API를 사용하려면 정확한 스프레드시트 ID와 범위가 필요합니다.
const SPREADSHEET_ID = "1lceeIMn6B_-DJABboN6vcTe5jdOz8GvfYX6nVdPe3DU"; // 스프레드시트 ID
const RANGE = "회원명부!A1:E100"; // 가져올 데이터 범위
const API_KEY = "AIzaSyAKnbmtCHWHmNTWW7hwq09GmAo11uHxZQk"; // GCP에서 생성된 API 키

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState("main"); // 현재 페이지 상태 관리

  useEffect(() => {
    if (currentPage === "main") {
      // 구글 API 클라이언트 로드
      function fetchData() {
        gapi.load("client", async () => {
          try {
            // API 클라이언트 초기화, Discovery Docs를 추가하여 시트 API 초기화
            await gapi.client.init({
              apiKey: API_KEY,
              discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"], // Discovery Docs 추가
            });

            // gapi.client.sheets 객체가 정의되었는지 확인 후 데이터를 가져옵니다.
            const response = await gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: SPREADSHEET_ID,
              range: RANGE,
            });

            // 가져온 데이터를 state에 저장
            setData(response.result.values || []); // 데이터가 없으면 빈 배열 처리
          } catch (error) {
            console.error("Error fetching data from Google Sheets", error);
          }
        });
      }

      // fetchData() 호출
      fetchData();
    } else {
      // 다른 페이지로 이동 시 데이터 숨김
      setData([]);
    }
  }, [currentPage]); // currentPage가 변경될 때만 실행

  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav>
            <Link to="/main" onClick={() => setCurrentPage("main")}><img src={clearLogo} alt="Logo" /></Link>{/* 로고 */}
            <Link to="#about">소개</Link>{/* 메뉴 항목 */}
            <Link to="#members">회원</Link>
            <Link to="/record" onClick={() => setCurrentPage("record")}>관리자</Link>
          </nav>
        </header>
        <div>
          {currentPage === "main" && (
            <>
              <h1>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월 <br />생일 회원</h1>
              {/* 데이터가 없으면 로딩 메시지 출력 */}
              {data.length === 0 ? (
                <p>Loading...</p>
              ) : (
                <table border="1">
                  <thead>
                    <tr>
                      {/* 첫 번째 행(헤더)을 표시 */}
                      {data[0]?.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice(1) // 첫 번째 행(헤더)을 제외
                      .filter(row => {
                        const currentMonth = new Date().getMonth() + 1; // 현재 월 (1월 = 1)
                        const monthColumn = parseInt(row[2], 10); // 데이터의 "월" 열(인덱스 2)을 숫자로 변환
                        return monthColumn === currentMonth; // 현재 월과 같은지 확인
                      })
                      .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>

        <Routes>
          {/* 페이지 라우팅 */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage() {
  return <h2>Main Page</h2>;
}

export default App;
