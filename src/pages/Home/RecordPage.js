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

  // 청팀 행을 추가하는 함수
  const addRow = (setRows, rows) => {
    const newRow = {
      id: rows.length + 1,
      name: `신입 ${rows.length + 1}`,
      attendance: 0,
      goal: '0',
      assist: '0',
      defense: 0,
      mvp: 0,
    };
    setRows([...rows, newRow]); // 새로운 행 추가
  };

  // 백팀 행을 추가하는 함수
  const addRow2 = (setRows2, rows2) => {
    const newRow = {
      id: rows2.length + 1,
      name: `신입 ${rows2.length + 1}`,
      attendance: 0,
      goal: '0',
      assist: '0',
      defense: 0,
      mvp: 0,
    };
    setRows2([...rows2, newRow]); // 새로운 행 추가
  };

  // 청팀 테이블 데이터를 ArrayList 형태로 집계하는 함수
  const aggregateData = () => {
    // mvp가 1인 사람들만 필터링
    const mvpPlayers = rows2.filter(row => row.mvp === 1);

    // MVP 선수 이름 출력 (여러 명일 수 있기 때문에 배열로 출력)
    if (mvpPlayers.length > 0) {
      const mvpNames = mvpPlayers.map(player => player.name).join(", ");
      alert(`MVP 선수: ${mvpNames}`);
    } else {
      alert("MVP 선수가 없습니다.");
    }

    // 청 추가적인 집계도 가능, 예: 골, 어시스트 등
    const blueAggregatedData = rows.map(row => ({
      id: row.id,
      name: row.name,
      attendance: row.attendance,
      goal: row.goal,
      assist: row.assist,
      defense: row.defense,
      mvp: row.mvp,
    }));

    // 각 행에 대한 정보를 alert로 출력
    blueAggregatedData.forEach(row => {
      alert(`
        이름: ${row.name}
        출석: ${row.attendance === 1 ? '1' : '0'}
        득점: ${row.goal}
        어시스트: ${row.assist}
        수비: ${row.defense}
        MVP: ${row.mvp === 1 ? '1' : '0'}
      `);
    });

    // 백 추가적인 집계도 가능, 예: 골, 어시스트 등
    const whiteAggregatedData = rows2.map(row => ({
      id: row.id,
      name: row.name,
      attendance: row.attendance,
      goal: row.goal,
      assist: row.assist,
      defense: row.defense,
      mvp: row.mvp,
    }));

    // 각 행에 대한 정보를 alert로 출력
    whiteAggregatedData.forEach(row => {
      alert(`
            이름: ${row.name}
            출석: ${row.attendance === 1 ? '1' : '0'}
            득점: ${row.goal}
            어시스트: ${row.assist}
            수비: ${row.defense}
            MVP: ${row.mvp === 1 ? '1' : '0'}
          `);
    });
  };



  return (
    <div className="App">
      <button onClick={aggregateData}>집계하기</button>
      {/* 첫 번째 표 */}
      <h2>청팀<button onClick={() => addRow(setRows, rows)}>행 추가</button></h2>
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
                <div>
                  <input
                    type="number"
                    value={row.goal}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), setRows)}>
                    -
                  </button>
                  <button onClick={() => updateRow(row.id, 'goal', parseInt(row.goal) + 1, setRows)}>
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
                  <button onClick={() => updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), setRows)}>
                    -
                  </button>
                  <button onClick={() => updateRow(row.id, 'assist', parseInt(row.assist) + 1, setRows)}>
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
      <h2>백팀 <button onClick={() => addRow2(setRows2, rows2)}>행 추가</button></h2>
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
                <div>
                  <input
                    type="number"
                    value={row.goal}
                    min="0"
                    readOnly
                  />
                  <button onClick={() => updateRow(row.id, 'goal', Math.max(parseInt(row.goal) - 1, 0), setRows2)}>
                    -
                  </button>
                  <button onClick={() => updateRow(row.id, 'goal', parseInt(row.goal) + 1, setRows2)}>
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
                  <button onClick={() => updateRow(row.id, 'assist', Math.max(parseInt(row.assist) - 1, 0), setRows2)}>
                    -
                  </button>
                  <button onClick={() => updateRow(row.id, 'assist', parseInt(row.assist) + 1, setRows2)}>
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
