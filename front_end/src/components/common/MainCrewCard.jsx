import React, { useState, useEffect } from "react";
import api from "../../js/api.js";

// 날짜 포맷팅 헬퍼 함수 (LocalDateTime -> YYYY.MM.DD)
const formatDate = (dateString) => {
  if (!dateString) return "날짜 정보 없음";
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const MainCrewCard = () => {
  const [recommendCrew, setRecommendCrew] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendCrew = async () => {
      try {
        // 🌟 백엔드의 크루 모집 전체 리스트 API를 찌릅니다.
        const response = await api.get("/post/best_list?page=0&size=1");
        if (response) {
          if (response.data) {
            if (response.data.content) {
              // 백엔드 응답 포맷(배열 구조 형태)에 맞추어 할당
              const crewList = response.data.content || [];
              // 데이터가 존재한다면 목록 중 첫 번째(최신) 크루를 추천 항목으로 선정
              if (crewList.length > 0) {
                const latestCrew = crewList[0];
                let difficulty = "새싹";
                if (latestCrew.runningLevel === "MEDIUM") difficulty = "나무";
                else if (latestCrew.runningLevel === "HIGH") difficulty = "숲";
                setRecommendCrew({
                  id: latestCrew.id,
                  level: difficulty, // levelType이나 기존 등급 필드 매핑
                  title: latestCrew.title || "등록된 제목이 없습니다.",
                  schedule: formatDate(latestCrew.appliedAt) || "일정 미정",
                  distance: latestCrew.distance
                    ? `${latestCrew.distance}km 이내`
                    : "거리 미정",
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("메인 화면 추천 크루 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendCrew();
  }, []);

  if (loading) {
    return (
      <span className="card-empty-msg">추천 크루를 불러오는 중입니다...</span>
    );
  }

  if (!recommendCrew) {
    return (
      <span className="card-empty-msg">
        현재 모집 중인 러닝 크루가 없습니다.
      </span>
    );
  }

  return (
    // 기존 Main.jsx 내부에 선언되어 있던 레이아웃 클래스 구조를 그대로 유지합니다.
    <div className="main-crew-card-item">
      <span className="crew-level-tag">{recommendCrew.level}</span>
      <div className="crew-text-summary">
        <h4>{recommendCrew.title}</h4>
        <p>
          {recommendCrew.schedule} • {recommendCrew.distance}
        </p>
      </div>
    </div>
  );
};

export default MainCrewCard;
