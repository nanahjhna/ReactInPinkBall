// Home.js
import '../../styles/App.css'; // 스타일 시트를 불러옵니다
import logo from '../../logo.svg'; // 로고 이미지를 불러옵니다 (현재 사용되지 않음)
import React, { useState } from 'react'; // React와 useState 훅을 불러옵니다

function App() {
  // 첫 번째 표의 사용자 정보 (rows)
  // 10명의 사용자 데이터를 초기화합니다.
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1, // 사용자 ID (1부터 시작)
      name: `사용자 ${index + 1}`, // 사용자 이름
      attendance: 0, // 출석 상태 (0: 결석, 1: 출석)
      goal: '0', // 득점
      assist: '0', // 어시스트
      defense: 0, // 수비
      mvp: 0, // MVP (0: 미선정, 1: 선정)
    }))
  );

  // 두 번째 표의 사용자 정보 (rows2)
  // 두 번째 표는 첫 번째 표와 같은 방식으로 초기화됩니다.
  const [rows2, setRows2] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1, // 사용자 ID (1부터 시작)
      name: `사용자 ${index + 1}`, // 사용자 이름
      attendance: 0, // 출석 상태 (0: 결석, 1: 출석)
      goal: '0', // 득점
      assist: '0', // 어시스트
      defense: 0, // 수비
      mvp: 0, // MVP (0: 미선정, 1: 선정)
    }))
  );

  // 행을 업데이트하는 함수 (두 표에 공통적으로 사용)
  // 특정 행의 값을 업데이트합니다. (출석, 득점, 어시스트 등)
  const updateRow = (id, key, value, setRows) => {
    setRows(rows => rows.map(row => (row.id === id ? { ...row, [key]: value } : row)));
  };

  return (
    <div className="App">
      {/* 첫 번째 표 */}
      <h2>청팀</h2>
      <table className="table1">
        <thead>
          <tr>
            <th>이름</th>
            <th>출석</th>
            <th>득점</th>
            <th>어시</th>
            <th>수비</th>
            <th>MVP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.attendance === 1} // 출석 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, setRows)} // 출석 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <select
                  value={row.goal}
                  onChange={(e) => updateRow(row.id, 'goal', e.target.value, setRows)} // 득점 변경
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>{i}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.assist}
                  onChange={(e) => updateRow(row.id, 'assist', e.target.value, setRows)} // 어시스트 변경
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>{i}</option>
                  ))}
                </select>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.defense === 1} // 수비 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, setRows)} // 수비 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.mvp === 1} // MVP 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, setRows)} // MVP 상태 변경
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 두 번째 표 */}
      <h2>백팀</h2>
      <table className="table2">
        <thead>
          <tr>
            <th>이름</th>
            <th>출석</th>
            <th>득점</th>
            <th>어시</th>
            <th>수비</th>
            <th>MVP</th>
          </tr>
        </thead>
        <tbody>
          {rows2.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.attendance === 1} // 출석 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, setRows2)} // 출석 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <select
                  value={row.goal}
                  onChange={(e) => updateRow(row.id, 'goal', e.target.value, setRows2)} // 득점 변경
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>{i}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.assist}
                  onChange={(e) => updateRow(row.id, 'assist', e.target.value, setRows2)} // 어시스트 변경
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>{i}</option>
                  ))}
                </select>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.defense === 1} // 수비 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, setRows2)} // 수비 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.mvp === 1} // MVP 여부를 체크박스로 표시
                      onChange={() => updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, setRows2)} // MVP 상태 변경
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
