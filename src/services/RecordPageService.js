// 특정 행의 값을 업데이트
export const updateRow = (id, key, value, rows) => 
  rows.map(row => (row.id === id ? { ...row, [key]: value } : row));

// 새로운 행 추가
export const addRow = (rows, teamName = '신입') => {
  const newRow = {
    id: rows.length + 1,
    name: `${teamName} ${rows.length + 1}`,
    attendance: 0,
    goal: '0',
    assist: '0',
    defense: 0,
    mvp: 0,
  };
  return [...rows, newRow];
};

export const addRow2 = (rows, teamName = '신입') => {
  const newRow = {
    id: rows.length + 1,
    name: `${teamName} ${rows.length + 1}`,
    attendance: 0,
    goal: '0',
    assist: '0',
    defense: 0,
    mvp: 0,
  };
  return [...rows, newRow];
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
  *24년12월08일 경기결과*
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

      alert(resultMessage);
  } else {
      alert("집계를 취소합니다.");
  }
};

