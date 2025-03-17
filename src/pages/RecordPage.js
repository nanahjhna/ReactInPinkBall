import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamDataContext } from '../context/TeamDataContext'; // Context 불러오기
import '../styles/RecordPage.css'; // 스타일 시트 불러오기
import { validateData, filterTeamData } from '../services/RecordPageService';

function RecordPage() {
  // 입력 데이터 관리
  const [quarterData, setQuarterData] = useState(
    Array.from({ length: 10 }, () => ({ quarter: "", team: "", goal: "", assist: "" }))
  );

  // 입력값 변경 처리 함수
  const handleQuarterChange = (index, field, value) => {
    const updatedData = [...quarterData];
    updatedData[index][field] = value;
    setQuarterData(updatedData);
  };

  // 데이터 저장 함수 (팀별로 분리)
  const handleSaveData = () => {
    // 데이터 유효성 검사
    const errorMessage = validateData(quarterData);
    if (errorMessage) {
      alert(errorMessage); // 오류 메시지 출력 후 종료
      return;
    }

    // 팀별 데이터 분류
    const blueData = filterTeamData(quarterData, "청");
    const whiteData = filterTeamData(quarterData, "백");

    setBlueTeamData(blueData);
    setWhiteTeamData(whiteData);

    navigate('/TeamRecordPage'); // 화면 전환
  };

  // 행 추가 함수
  const addRow = () => {
    setQuarterData([...quarterData, { quarter: "", team: "", goal: "", assist: "" }]);
  };

  const { setBlueTeamData, setWhiteTeamData } = useContext(TeamDataContext); // Context 사용
  const navigate = useNavigate();

  return (
    <div className="App">
      <table className="quarter-table">
        <thead>
          <tr>
            <th>쿼터</th>
            <th>팀</th>
            <th>골</th>
            <th>어시스트</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} style={{ marginTop: "10px" }}>행 추가</button>
      <button onClick={handleSaveData} style={{ marginLeft: "10px" }}>팀별 데이터 저장</button>
    </div>
  );
}

export default RecordPage;