import '../styles/RecordPage.css'; // 스타일 시트를 불러옵니다
import React, { useState } from 'react'; // React와 useState 훅을 불러옵니다
// 비즈니스 로직 가져오기
import { addRow, addRow2, updateRow, aggregateData } from '../services/RecordPageService.js';

function RecordPage() {
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

    // 초기 데이터 정의
    const initialRows = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `사용자 ${index + 1}`,
      attendance: 0,
      goal: '0',
      assist: '0',
      defense: 0,
      mvp: 0,
    }));
    
  // 첫 번째 테이블 초기화
  const resetRows = () => {
    setRows([...initialRows]); // setRows에 초기값을 전달
  };

  // 두 번째 테이블 초기화
  const resetRows2 = () => {
    setRows2([...initialRows]); // setRows2에 초기값을 전달
  };

  return (
    <div className="App">
      {/* 첫 번째 표 */}
      <h2>청팀
        <button onClick={() => setRows(addRow(rows))}>행 추가</button>
        <button onClick={resetRows}>초기화</button>
              </h2>
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
                      onChange={() => setRows(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows))} // 출석 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="number"
                    value={row.goal}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => setRows(updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), rows))}>
                    -
                  </button>
                  <button onClick={() => setRows(updateRow(row.id, 'goal', parseInt(row.goal) + 1, rows))}>
                    +
                  </button>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="number"
                    value={row.assist}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => setRows(updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), rows))}>
                    -
                  </button>
                  <button onClick={() => setRows(updateRow(row.id, 'assist', parseInt(row.assist) + 1, rows))}>
                    +
                  </button>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.defense === 1} // 수비 여부를 체크박스로 표시
                      onChange={() => setRows(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows))} // 수비 상태 변경
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
                      onChange={() => setRows(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows))} // MVP 상태 변경
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 두 번째 표 */}
      <h2>백팀
        <button onClick={() => setRows2(addRow2(rows2))}>행 추가</button>
        <button onClick={resetRows2}>초기화</button>
      </h2>
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
                      onChange={() => setRows2(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows2))} // 출석 상태 변경
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="number"
                    value={row.goal}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => setRows2(updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), rows2))}>
                    -
                  </button>
                  <button onClick={() => setRows2(updateRow(row.id, 'goal', parseInt(row.goal) + 1, rows2))}>
                    +
                  </button>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="number"
                    value={row.assist}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => setRows2(updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), rows2))}>
                    -
                  </button>
                  <button onClick={() => setRows2(updateRow(row.id, 'assist', parseInt(row.assist) + 1, rows2))}>
                    +
                  </button>
                </div>
              </td>

              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.defense === 1} // 수비 여부를 체크박스로 표시
                      onChange={() => setRows2(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows2))} // 수비 상태 변경
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
                      onChange={() => setRows2(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows2))} // MVP 상태 변경
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2><button onClick={() => aggregateData(rows, rows2)}>집계하기</button></h2>
    </div>
  );
}

export default RecordPage;
