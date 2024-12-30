import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import clearLogo from '../assets/clearLogo.png';
import '../styles/mainPage.css';
import RecordPage from './RecordPage';
import { gapi } from 'gapi-script';

const SPREADSHEET_ID = "1lceeIMn6B_-DJABboN6vcTe5jdOz8GvfYX6nVdPe3DU"; // 스프레드시트 ID
const RANGE = "회원명부!A1:E100"; // 가져올 데이터 범위
const API_KEY = "AIzaSyAKnbmtCHWHmNTWW7hwq09GmAo11uHxZQk"; // GCP에서 생성된 API 키

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState("main");

  useEffect(() => {
    if (currentPage === "main") {
      function fetchData() {
        gapi.load("client", async () => {
          try {
            await gapi.client.init({
              apiKey: API_KEY,
              discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            });

            const response = await gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: SPREADSHEET_ID,
              range: RANGE,
            });

            const values = response.result.values || [];
            if (values.length > 1) {
              const headers = values[0]; // 헤더
              const rows = values.slice(1); // 데이터 행
              // 날짜 기준 정렬 (세 번째 열, index=2 사용)
              rows.sort((a, b) => {
                const dayA = parseInt(a[2], 10); // 문자열을 숫자로 변환
                const dayB = parseInt(b[2], 10); // 문자열을 숫자로 변환
                return dayA - dayB; // 오름차순 정렬
              });
              setData([headers, ...rows]); // 정렬된 데이터 저장
            } else {
              setData(values);
            }
          } catch (error) {
            console.error("Error fetching data from Google Sheets", error);
          }
        });
      }

      fetchData();
    } else {
      setData([]);
    }
  }, [currentPage]);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav>
            <Link to="/main" onClick={() => setCurrentPage("main")}><img src={clearLogo} alt="Logo" /></Link>
            {/* 메뉴 항목 */}
            {/*<Link to="#about">소개</Link>
            <Link to="#members">회원</Link>
            <Link to="/record" onClick={() => setCurrentPage("record")}>관리자</Link> */}
          </nav>
        </header>
        <div>
          {currentPage === "main" && (
            <>
              <h1>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월 <br />생일 회원</h1>
              {data.length === 0 ? (
                <p>Loading...</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      {data[0]?.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice(1) // 헤더 제외
                      .filter(row => {
                        const currentMonth = new Date().getMonth() + 1; // 현재 월
                        const monthColumn = parseInt(row[2], 10); // 월 열 (숫자 변환)
                        return monthColumn === currentMonth; // 현재 월과 일치하는 데이터만
                      })
                      .sort((a, b) => parseInt(a[3], 10) - parseInt(b[3], 10)) // 날짜 기준 정렬 (4번째 열: 일)
                      .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td> // 셀 데이터를 출력
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
          <h2>생일 축하드립니다^^</h2>
        </div>

        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage() {
  return;
}

export default App;