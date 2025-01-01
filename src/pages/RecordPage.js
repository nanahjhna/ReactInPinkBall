import React, { useState, useEffect } from 'react';
import '../styles/RecordPage.css'; // 스타일 시트 불러오기
import { addRow, addRow2, updateRow, aggregateData, fetchSpreadsheetData } from '../services/RecordPageService.js';

function RecordPage() {
  // 사용자 데이터 상태
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [result, setResult] = useState('');  // result 상태를 정의합니다.

  // 청팀 상태 정의
  const [newMb, setNewMb] = useState(''); // 사용자 입력값 상태 관리
  const [showInput, setShowInput] = useState(false); // 입력창 표시 여부

  // 백팀 상태 정의
  const [newMb2, setNewMb2] = useState(''); // 사용자 입력값 상태 관리
  const [showInput2, setShowInput2] = useState(false); // 입력창 표시 여부


  const handleAddRow = () => {
    if (newMb.trim()) { // 이름이 비어있지 않으면
      setRows(addRow(rows, newMb)); // 새로운 행 추가
      setNewMb(''); // 입력 필드 초기화
      setShowInput(false); // 입력창 숨기기
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  const handleAddRow2 = () => {
    if (newMb2.trim()) { // 이름이 비어있지 않으면
      setRows2(addRow2(rows2, newMb2)); // 새로운 행 추가
      setNewMb2(''); // 입력 필드 초기화
      setShowInput2(false); // 입력창 숨기기
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  // Google Sheets에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSpreadsheetData(); // 데이터 가져오기

        const processedData = data.map((row, index) => ({
          id: index + 1,
          name: row[0], // 이름 열 (예: A열)
          attendance: 0,
          goal: '0',
          assist: '0',
          defense: 0,
          mvp: 0,
        }));

        setRows(processedData);
        setRows2(processedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  // 초기 데이터 정의
  const initialRows = rows.map((row, index) => ({
    id: index + 1,
    name: row.name, // rows 배열에서 name 값을 가져옵니다
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
      setRows2([...initialRows]); // setRows에 초기값을 전달
    };

  return (
    <div className="App">
      {/* 첫 번째 표 */}
      <h2>청팀
        {/* 행 추가 버튼 */}
        <button onClick={() => setShowInput(true)}>행 추가</button>

        {/* 이름 입력창 */}
        {showInput && (
          <div>
            <input
              type="text"
              value={newMb}
              onChange={(e) => setNewMb(e.target.value)} // 입력값 업데이트
              placeholder="이름을 입력하세요"
            />
            <button onClick={handleAddRow}>추가</button>
            <button onClick={() => setShowInput(false)}>취소</button>
          </div>
        )}

        {/* 표 */}
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
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.attendance === 1}
                      onChange={() => setRows(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows))}
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
                      checked={row.defense === 1}
                      onChange={() => setRows(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows))}
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.mvp === 1}
                      onChange={() => setRows(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows))}
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 두 번째 표 (백팀) */}
      <h2>백팀
        {/* 행 추가 버튼 */}
        <button onClick={() => setShowInput2(true)}>행 추가</button>

        {/* 이름 입력창 */}
        {showInput2 && (
          <div>
            <input
              type="text"
              value={newMb2}
              onChange={(e) => setNewMb2(e.target.value)} // 입력값 업데이트
              placeholder="이름을 입력하세요"
            />
            <button onClick={handleAddRow2}>추가</button>
            <button onClick={() => setShowInput2(false)}>취소</button>
          </div>
        )}

        {/* 표 */}
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
          {rows2.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.attendance === 1}
                      onChange={() => setRows2(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows2))}
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
                      checked={row.defense === 1}
                      onChange={() => setRows2(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows2))}
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={row.mvp === 1}
                      onChange={() => setRows2(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows2))}
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 집계 버튼 */}
      <h2><button onClick={() => setResult(aggregateData(rows, rows2))}>집계하기</button></h2>
      {/* 집계 결과를 표시하는 textarea */}
      <textarea value={result} readOnly rows="10" cols="50"></textarea>
    </div>
  );
}

export default RecordPage;
