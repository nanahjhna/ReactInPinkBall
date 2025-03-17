import axios from 'axios';
import { gapi } from "gapi-script";

// RecordPageService.js

// 🔹 데이터 유효성 검사 함수
export const validateData = (quarterData) => {
    if (quarterData.some(row => row.goal === "" && row.team !== "")) {
        return "팀을 입력한 경우 반드시 골을 입력해야 합니다.";
    }
    if (quarterData.some(row => row.goal !== "" && row.team === "")) {
        return "골을 입력한 경우 반드시 팀을 선택해야 합니다.";
    }
    if (quarterData.some(row => row.assist !== "" && row.goal === "")) {
        return "어시스트를 입력한 경우 반드시 골을 입력해야 합니다.";
    }
    return null; // 오류가 없으면 null 반환
};

// 🔹 팀별 데이터 필터링 함수
export const filterTeamData = (quarterData, teamColor) => {
    return quarterData
        .filter(row => row.team === teamColor)
        .map(({ quarter, team, goal, assist }) => ({ quarter, team, goal, assist }));
};
