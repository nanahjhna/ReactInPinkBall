// React와 필요한 라이브러리들을 import
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import clearLogo from '../assets/clearLogo.png';
import '../styles/mainPage.css';
import RecordPage from './RecordPage';
import { gapi } from 'gapi-script';

// Google Spreadsheet 관련 변수들
const SPREADSHEET_ID = "1lceeIMn6B_-DJABboN6vcTe5jdOz8GvfYX6nVdPe3DU"; // 사용할 Google 스프레드시트 ID
const RANGE = "회원명부!A1:E100"; // 데이터를 가져올 범위
const API_KEY = "AIzaSyAKnbmtCHWHmNTWW7hwq09GmAo11uHxZQk"; // GCP에서 발급받은 API 키

function App() {
  // 상태 변수들 선언
  const [data, setData] = useState([]); // 스프레드시트 데이터를 저장할 상태
  const [currentPage, setCurrentPage] = useState("main"); // 현재 페이지 상태 (기본값: "main")

  // 페이지가 변경될 때마다 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    if (currentPage === "main") { // 현재 페이지가 'main'일 경우
      function fetchData() {
        gapi.load("client", async () => { // Google API 클라이언트 로드
          try {
            // Google API 클라이언트 초기화
            await gapi.client.init({
              apiKey: API_KEY, // API 키 설정
              discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"], // 스프레드시트 API discovery 문서 설정
            });

            // 데이터를 가져옴
            const response = await gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: SPREADSHEET_ID, // 스프레드시트 ID
              range: RANGE, // 데이터 범위
            });

            const values = response.result.values || []; // 스프레드시트에서 가져온 값들
            if (values.length > 1) { // 데이터가 있다면
              const headers = values[0]; // 첫 번째 행은 헤더로 처리
              const rows = values.slice(1); // 나머지 행은 데이터로 처리
              // 날짜 기준으로 정렬 (세 번째 열, index=2 사용)
              rows.sort((a, b) => {
                const dayA = parseInt(a[2], 10); // 첫 번째 날짜 데이터를 숫자로 변환
                const dayB = parseInt(b[2], 10); // 두 번째 날짜 데이터를 숫자로 변환
                return dayA - dayB; // 오름차순 정렬
              });
              setData([headers, ...rows]); // 정렬된 데이터를 상태에 저장
            } else {
              setData(values); // 데이터가 없다면 빈 값 저장
            }
          } catch (error) { // 에러 처리
            console.error("Error fetching data from Google Sheets", error); // 오류 메시지 출력
          }
        });
      }

      fetchData(); // 데이터 가져오기 함수 호출
    } else { // 'main' 페이지가 아닐 경우
      setData([]); // 데이터를 초기화
    }
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  return (
      <div className="App">
        <div>
          {currentPage === "main" && ( // 현재 페이지가 'main'일 경우에만 실행
            <>
              <h1>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월 <br />생일 회원</h1> {/* 현재 연도와 월 표시 */}
              {data.length === 0 ? ( // 데이터가 없으면 로딩 메시지 표시
                <p>Loading...</p>
              ) : ( // 데이터가 있으면 테이블로 표시
                <table className="table">
                  <thead>
                    <tr>
                      {data[0]?.map((header, index) => ( // 헤더 행을 반복하여 생성
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice(1) // 첫 번째 행(헤더) 제외
                      .filter(row => {
                        const currentMonth = new Date().getMonth() + 1; // 현재 월
                        const monthColumn = parseInt(row[2], 10); // 월 열을 숫자로 변환
                        return monthColumn === currentMonth; // 현재 월과 일치하는 데이터만 필터링
                      })
                      .sort((a, b) => parseInt(a[3], 10) - parseInt(b[3], 10)) // 날짜 기준으로 정렬
                      .map((row, rowIndex) => ( // 데이터 행을 반복하여 생성
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => ( // 각 셀 데이터를 반복하여 표시
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
          <h2>생일 축하드립니다^^</h2> {/* 생일 축하 메시지 */}
        </div>

      </div>
  );
}
export default App; // App 컴포넌트 내보내기
