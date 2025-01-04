import axios from 'axios';



// 청팀 스프레드시트 데이터 가져오기
export const blueTeamNameData = async () => {
  const SHEET_ID = "1lceeIMn6B_-DJABboN6vcTe5jdOz8GvfYX6nVdPe3DU"; // 사용할 Google 스프레드시트 ID
  const API_KEY = "AIzaSyAKnbmtCHWHmNTWW7hwq09GmAo11uHxZQk"; // GCP에서 발급받은 API 키
  const RANGE = "기록!B8:B47"; // 데이터를 가져올 범위

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    return response.data.values; // 데이터 반환
  } else {
    throw new Error('Google Sheets API 호출 실패');
  }
};

// 백팀 스프레드시트 데이터 가져오기
export const whiteTeamNameData = async () => {
  const SHEET_ID = "1lceeIMn6B_-DJABboN6vcTe5jdOz8GvfYX6nVdPe3DU"; // 사용할 Google 스프레드시트 ID
  const API_KEY = "AIzaSyAKnbmtCHWHmNTWW7hwq09GmAo11uHxZQk"; // GCP에서 발급받은 API 키
  const RANGE = "기록!L8:L47"; // 데이터를 가져올 범위

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    return response.data.values; // 데이터 반환
  } else {
    throw new Error('Google Sheets API 호출 실패');
  }
};

// 특정 행의 값을 업데이트
export const updateRow = (id, key, value, rows) =>
  rows.map(row => (row.id === id ? { ...row, [key]: value } : row));

// 새로운 행 추가
export const addRow = (rows, teamName = '신입') => {
  const newRow = {
    id: rows.length + 1,
    name: `${teamName}`,
    attendance: 0,
    goal: '0',
    assist: '0',
    defense: 0,
    mvp: 0,
  };
  return [...rows, newRow];
};

  // 백팀에 행 추가 함수
  export const addRow2 = (rows2, teamName = '신입') => {
    const newRow = {
      id: rows2.length + 1,
      name: `${teamName}`,
      attendance: 0,
      goal: '0',
      assist: '0',
      defense: 0,
      mvp: 0,
    };
    return [...rows2, newRow]; // 기존 배열에 새 행을 추가한 새로운 배열 반환
  };

// 데이터 합산 및 결과 메시지 생성
// aggregateData 함수를 매개변수 기반으로 변경
export const aggregateData = (blueTeamRows, whiteTeamRows) => {
  const confirmMessage = `집계를 하시겠습니까?`;

  // 예/아니요 확인 창 표시
  if (window.confirm(confirmMessage)) {
    alert("집계를 진행합니다.");

    // 청팀과 백팀의 데이터 합산
    const blueTeamGoalsSum = blueTeamRows.reduce((sum, row) => sum + parseInt(row.goal), 0);
    const whiteTeamGoalsSum = whiteTeamRows.reduce((sum, row) => sum + parseInt(row.goal), 0);

    const blueGoalScorers = blueTeamRows.filter(row => parseInt(row.goal) > 0).map(row => `${row.name}${row.goal}`);
    const blueAssistScorers = blueTeamRows.filter(row => parseInt(row.assist) > 0).map(row => `${row.name}${row.assist}`);

    const whiteGoalScorers = whiteTeamRows.filter(row => parseInt(row.goal) > 0).map(row => `${row.name}${row.goal}`);
    const whiteAssistScorers = whiteTeamRows.filter(row => parseInt(row.assist) > 0).map(row => `${row.name}${row.assist}`);

    const blueMVPs = blueTeamRows.filter(row => row.mvp === 1).map(row => row.name);
    const whiteMVPs = whiteTeamRows.filter(row => row.mvp === 1).map(row => row.name);

    const blueDf = blueTeamRows.filter(row => row.defense === 1).map(row => row.name);
    const whiteDf = whiteTeamRows.filter(row => row.defense === 1).map(row => row.name);

    // 현재 날짜를 YYYY년MM월DD일 형식으로 가져오기
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear().toString().slice(2); // 24년 형식으로 표시
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 두 자리로 표시
      const day = today.getDate().toString().padStart(2, '0'); // 두 자리로 표시
      return `${year}년${month}월${day}일`;
    };

    const mvpMessage = blueTeamGoalsSum > whiteTeamGoalsSum
      ? `MVP(청팀)
      레전드 - ${blueMVPs[0] || '미선정'}
      청년 - ${blueMVPs[1] || '미선정'} `
      : whiteTeamGoalsSum > blueTeamGoalsSum
        ? `MVP(백팀)
      레전드 - ${whiteMVPs[0] || '미선정'}
      청년 - ${whiteMVPs[1] || '미선정'} `
        : 'MVP 없음';

    // 결과 메시지 작성
    const resultMessage = `
  *${getCurrentDate()} 경기결과*
  ■청백전
  ${blueTeamGoalsSum}대${whiteTeamGoalsSum} ${blueTeamGoalsSum > whiteTeamGoalsSum ? '청팀승' : whiteTeamGoalsSum > blueTeamGoalsSum ? '백팀승' : '무승부'}
  
  ※청팀
  골 : ${blueGoalScorers.join(', ') || '없음'},
  어시 : ${blueAssistScorers.join(', ') || '없음'}
  
  ※백팀
  골 : ${whiteGoalScorers.join(', ') || '없음'},
  어시 : ${whiteAssistScorers.join(', ') || '없음'}
  
  ${mvpMessage},
  
  수비상(청팀)
  레전드 - ${blueDf[0] || '미선정'}
  청년 - ${blueDf[1] || '미선정'}
  
  수비상(백팀)
  레전드 - ${whiteDf[0] || '미선정'}
  청년 - ${whiteDf[1] || '미선정'}
  
  오늘 하루 고생하셨습니다
      `;

    // 결과를 상태에 업데이트
    downloadCSV(blueTeamRows, whiteTeamRows);
    return resultMessage;
  } else {
    alert("집계를 취소합니다.");
  }
};

// 현재 시간
const now = new Date();

// // YYYYMMDDHHMMSS 형식 출력
// const formattedTime = [
//   now.getFullYear(),
//   String(now.getMonth() + 1).padStart(2, "0"),
//   String(now.getDate()).padStart(2, "0"),
//   String(now.getHours()).padStart(2, "0"),
//   String(now.getMinutes()).padStart(2, "0"),
//   String(now.getSeconds()).padStart(2, "0"),
// ].join("");

export const convertRowsToCSV = (rows) => {
  const headers = ["이름", "출석", "득점", "어시", "수비", "MVP"];
  const csvContent = rows.map(row =>
    [row.name, row.attendance, row.goal, row.assist, row.defense, row.mvp].join("\t")
  );
  return [headers.join("\t"), ...csvContent].join("\n");
};

export const downloadCSV = (rows, rows2) => {
  const blueTeamCSV = convertRowsToCSV(rows);
  const whiteTeamCSV = convertRowsToCSV(rows2);
  const csvData = `${blueTeamCSV}\n${whiteTeamCSV}`;
  const formattedTime = new Date().toISOString().replace(/[:.-]/g, "_").slice(0, 15);
  
  // UTF-8 BOM 추가
  const bom = "\uFEFF";
  const blob = new Blob([bom + csvData], { type: "text/csv;charset=utf-8;" });

  if (navigator.msSaveBlob) {
    // For IE/Edge compatibility
    navigator.msSaveBlob(blob, `${formattedTime}_team_records.csv`);
  } else {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${formattedTime}_team_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  }
};

