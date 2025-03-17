import React, { createContext, useState } from 'react';

// 1. Context 생성
export const TeamDataContext = createContext(null);

// 2. Provider 컴포넌트 생성
export const TeamDataProvider = ({ children }) => {
  const [blueTeamData, setBlueTeamData] = useState([]);
  const [whiteTeamData, setWhiteTeamData] = useState([]);

  return (
    <TeamDataContext.Provider value={{ blueTeamData, setBlueTeamData, whiteTeamData, setWhiteTeamData }}>
      {children}
    </TeamDataContext.Provider>
  );
};
