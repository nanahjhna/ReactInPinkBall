import React, { useState, useEffect, useContext } from 'react';
import '../styles/RecordPage.css'; // 스타일 시트 불러오기
import { addRow, addRow2, updateRow, aggregateData, blueTeamNameData, whiteTeamNameData, downloadCSV, SheetSend } from '../services/TeamRecordPageService.js';
import { TeamDataContext } from '../context/TeamDataContext'; // Context 불러오기

function RecordPage() {
  const { blueTeamData, whiteTeamData } = useContext(TeamDataContext); // 전역 상태 가져오기

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

  const [isBlueTableVisible, setIsBlueTableVisible] = useState(true);
  const [isWhiteTableVisible, setIsWhiteTableVisible] = useState(true);

  const toggleBlueTable = () => setIsBlueTableVisible(!isBlueTableVisible);
  const toggleWhiteTable = () => setIsWhiteTableVisible(!isWhiteTableVisible);

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
        const blueNameData = await blueTeamNameData(); // 데이터 가져오기
        const whiteNameData = await whiteTeamNameData(); // 데이터 가져오기
        const processedData = blueNameData.map((row, index) => ({
          id: index + 1,
          name: row[0], // 이름 열 (예: A열)
          attendance: +row[1], // 숫자로 변환
          // goal: row[2] ? row[2] : '0', // row[2] 값이 없으면 '0'으로 설정
          goal: 0,
          assist: 0,
          defense: 0,
          mvp: 0,
          team: '청', // 기본값 설정
        }));


        const processedData2 = whiteNameData.map((row, index) => ({
          id: index + 1,
          name: row[0], // 이름 열 (예: A열)
          attendance: +row[1], // 숫자로 변환
          goal: 0,
          assist: 0,
          defense: 0,
          mvp: 0,
          team: '백', // 기본값 설정
        }));

        setRows(processedData);
        setRows2(processedData2);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  // 첫 번째 테이블 초기화
  const resetRows = () => {
    setRows(rows.map(row => ({ ...row, attendance: 0, goal: '0', assist: '0', defense: 0, mvp: 0 })));
  };

  // 두 번째 테이블 초기화
  const resetRows2 = () => {
    setRows2(rows2.map(row => ({ ...row, attendance: 0, goal: '0', assist: '0', defense: 0, mvp: 0 })));
  };

  const moveRow = (id, newTeam, currentRows, targetRows, setCurrentRows, setTargetRows) => {
    const rowToMove = currentRows.find(row => row.id === id); // 이동할 행 찾기
    if (rowToMove) {
      const updatedRow = { ...rowToMove, id: targetRows.length + 1, team: newTeam }; // 새 ID와 팀 정보 업데이트
      setCurrentRows(currentRows.filter(row => row.id !== id)); // 현재 팀에서 제거
      setTargetRows([...targetRows, updatedRow]); // 대상 팀에 추가
    }
  };

  return (
    <div className="App">

      <h3>청팀 데이터</h3>
      <pre>{JSON.stringify(blueTeamData, null, 2)}</pre>

      <h3>백팀 데이터</h3>
      <pre>{JSON.stringify(whiteTeamData, null, 2)}</pre>

      {/* 첫 번째 표 */}
      <h2>청팀
        <button onClick={toggleBlueTable}>{isBlueTableVisible ? '숨기기' : '보이기'}</button>
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
      {isBlueTableVisible && (
        <table className="table1">
          <thead>
            <tr>
              <th>소속</th>
              <th>이름</th>
              <th>출석</th>
              <th>득점</th>
              <th>어시</th>
              <th>수비</th>
              <th>MVP</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter((row) => row.name && row.name.trim() !== '') // 이름이 공백이거나 null인 경우 제외
              .map((row) => (
                <tr key={row.id}>
                  <td>
                    <select
                      value={row.team}
                      onChange={(e) =>
                        moveRow(
                          row.id,
                          e.target.value, // 새 팀
                          rows,           // 현재 팀 데이터
                          rows2,          // 대상 팀 데이터
                          setRows,        // 현재 팀 setter
                          setRows2        // 대상 팀 setter
                        )
                      }
                    >
                      <option value='청'>청</option>
                      <option value='백'>백</option>
                    </select>
                  </td>
                  <td className="name-cell">{row.name}</td>
                  <td>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={row.attendance === 1}
                          onChange={() =>
                            setRows(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows))
                          }
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        className="button"
                        onClick={() =>
                          setRows(updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), rows))
                        }
                        disabled={row.attendance === 0}
                      >
                        -
                      </button>
                      <input type="number" value={row.goal} min="0" readOnly disabled={row.attendance === 0} />
                      <button
                        className="button"
                        onClick={() =>
                          setRows(updateRow(row.id, 'goal', parseInt(row.goal) + 1, rows))
                        }
                        disabled={row.attendance === 0}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        className="button"
                        onClick={() =>
                          setRows(updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), rows))
                        }
                        disabled={row.attendance === 0}
                      >
                        -
                      </button>
                      <input type="number" value={row.assist} min="0" readOnly disabled={row.attendance === 0} />
                      <button
                        className="button"
                        onClick={() =>
                          setRows(updateRow(row.id, 'assist', parseInt(row.assist) + 1, rows))
                        }
                        disabled={row.attendance === 0}
                      >
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
                          onChange={() =>
                            setRows(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows))
                          }
                          disabled={row.attendance === 0}
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
                          onChange={() =>
                            setRows(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows))
                          }
                          disabled={row.attendance === 0}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      )}
      {/* 두 번째 표 (백팀) */}
      <h2>백팀
        <button onClick={toggleWhiteTable}>{isWhiteTableVisible ? '숨기기' : '보이기'}</button>
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
      {isWhiteTableVisible && (
        <table className="table2">
          <thead>
            <tr>
              <th>소속</th>
              <th>이름</th>
              <th>출석</th>
              <th>득점</th>
              <th>어시</th>
              <th>수비</th>
              <th>MVP</th>
            </tr>
          </thead>
          <tbody>
            {rows2
              .filter((row) => row.name && row.name.trim() !== '') // 이름이 공백이거나 null인 경우 제외
              .map((row) => (
                <tr key={row.id}>
                  <td>
                    <select
                      value={row.team}
                      onChange={(e) =>
                        moveRow(
                          row.id,
                          e.target.value, // 새 팀
                          rows2,          // 현재 팀 데이터
                          rows,           // 대상 팀 데이터
                          setRows2,       // 현재 팀 setter
                          setRows         // 대상 팀 setter
                        )
                      }
                    >
                      <option value="청">청</option>
                      <option value="백">백</option>
                    </select>
                  </td>
                  <td className="name-cell">{row.name}</td>
                  <td>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={row.attendance === 1}
                          onChange={() =>
                            setRows2(updateRow(row.id, 'attendance', row.attendance === 1 ? 0 : 1, rows2))
                          }
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          setRows2(updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), rows2))
                        }
                        disabled={row.attendance === 0}
                      >
                        -
                      </button>
                      <input type="number" value={row.goal} min="0" readOnly disabled={row.attendance === 0} />
                      <button
                        onClick={() =>
                          setRows2(updateRow(row.id, 'goal', parseInt(row.goal) + 1, rows2))
                        }
                        disabled={row.attendance === 0}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          setRows2(updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), rows2))
                        }
                        disabled={row.attendance === 0}
                      >
                        -
                      </button>
                      <input type="number" value={row.assist} min="0" readOnly disabled={row.attendance === 0} />
                      <button
                        onClick={() =>
                          setRows2(updateRow(row.id, 'assist', parseInt(row.assist) + 1, rows2))
                        }
                        disabled={row.attendance === 0}
                      >
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
                          onChange={() =>
                            setRows2(updateRow(row.id, 'defense', row.defense === 1 ? 0 : 1, rows2))
                          }
                          disabled={row.attendance === 0}
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
                          onChange={() =>
                            setRows2(updateRow(row.id, 'mvp', row.mvp === 1 ? 0 : 1, rows2))
                          }
                          disabled={row.attendance === 0}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {/* 집계 버튼 */}
      <h2>
        <button onClick={() => setResult(aggregateData(rows, rows2))}>집계하기</button>
        <button onClick={() => downloadCSV(rows, rows2)}>CSV다운</button>
        <button onClick={() => SheetSend(rows)}>데이터 전송</button>
      </h2>
      {/* 집계 결과를 표시하는 textarea */}
      <textarea value={result} readOnly rows="10" cols="50"></textarea>
    </div>
  );
}

export default RecordPage;