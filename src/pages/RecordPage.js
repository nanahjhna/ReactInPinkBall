import React, { useState, useEffect } from 'react';
import '../styles/RecordPage.css'; // 스타일 시트 불러오기

function RecordPage() {
  const [quarterData, setQuarterData] = useState(
    Array.from({ length: 29 }, () => ({ quarter: "", goal: "", assist: "", note: "" }))
  );

  // 입력값 변경 처리 함수
  const handleQuarterChange = (index, field, value) => {
    const updatedData = [...quarterData];
    updatedData[index][field] = value;
    setQuarterData(updatedData);
  };

  // 데이터 저장 함수 (팀별로 분리)
  const handleSaveData = () => {
    const blueData = quarterData.filter((row) => row.team === "청").map(({ quarter, goal, assist }) => ({ quarter, goal, assist }));
    const whiteData = quarterData.filter((row) => row.team === "백").map(({ quarter, goal, assist }) => ({ quarter, goal, assist }));

    setBlueTeamData(blueData);
    setWhiteTeamData(whiteData);
  };

  const [blueTeamData, setBlueTeamData] = useState([]); // 청팀 저장 변수
  const [whiteTeamData, setWhiteTeamData] = useState([]); // 백팀 저장 변수

  return (
    <div className="App">
      <table className="quarter-table">
        <thead>
          <tr>
            <th>쿼터</th>
            <th>골</th>
            <th>어시스트</th>
            <th>팀</th>
          </tr>
        </thead>
        <tbody>
          {quarterData.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  value={row.quarter}
                  onChange={(e) => handleQuarterChange(index, "quarter", e.target.value)}
                >
                  <option value="">선택</option>
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.goal}
                  onChange={(e) => handleQuarterChange(index, "goal", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.assist}
                  onChange={(e) => handleQuarterChange(index, "assist", e.target.value)}
                />
              </td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`team-${index}`}
                    value="청"
                    checked={row.team === "청"}
                    onChange={() => handleQuarterChange(index, "team", "청")}
                  />
                  청
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="radio"
                    name={`team-${index}`}
                    value="백"
                    checked={row.team === "백"}
                    onChange={() => handleQuarterChange(index, "team", "백")}
                  />
                  백
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSaveData} style={{ marginLeft: "10px" }}>팀별 데이터 저장</button>

      <h3>청팀 데이터</h3>
      <pre>{JSON.stringify(blueTeamData, null, 2)}</pre>

      <h3>백팀 데이터</h3>
      <pre>{JSON.stringify(whiteTeamData, null, 2)}</pre>
    </div>
  );
}

export default RecordPage;
