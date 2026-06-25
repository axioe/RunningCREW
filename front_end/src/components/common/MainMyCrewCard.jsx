import React, { useState, useEffect } from "react";
import useAuthStore from "./useAuthStore.jsx";
import api from "../../js/api.js";

// 날짜 포맷팅 헬퍼 함수 (LocalDateTime -> YYYY.MM.DD)
const formatDate = (dateString) => {
  if (!dateString) return "날짜 정보 없음";
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const MainMyCrewCard = () => {
  const user = useAuthStore((state) => state.user); // 로그인한 유저 정보 가져오기
  const [myCrew, setMyCrew] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🌟 비로그인 상태라면 API를 호출하지 않고 로딩을 끝냅니다.
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    const fetchMyCrewData = async () => {
      try {
        // 백엔드의 '내 가입 크루 조회' API 엔드포인트를 호출합니다.
        // 예시: /api/user/crew?userId=유저ID (프로젝트 백엔드 스펙에 맞게 주소를 수정하세요)
        const response = await api.get(`/post/getAllByUserId`, {
          params: { userId: user.id },
        });
        const myCrewList = response.data || [];

        // 내가 참여 중인 크루 중 가장 최근에 가입했거나 활동일이 가까운 1건 추출
        if (myCrewList.length > 0) {
          const latestMyCrew = myCrewList[0];
          setMyCrew({
            id: latestMyCrew.id,
            level: latestMyCrew.crewRole,
            title: latestMyCrew.title || "참여 중인 크루 정보가 없습니다.",
            schedule: formatDate(latestMyCrew.appliedAt) || "일정 미정",
            distance: latestMyCrew.distance
              ? `${latestMyCrew.distance}km 이내`
              : "",
          });
        }
      } catch (error) {
        console.error("메인 화면 내 크루 현황 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCrewData();
  }, [user]);

  // 1. 아직 로그인하지 않은 비회원 유저인 경우
  if (!user) {
    return (
      <span className="card-empty-msg">
        로그인 후 내 크루 현황을 확인해 보세요.
      </span>
    );
  }

  // 2. 데이터를 불러오는 중일 경우
  if (loading) {
    return (
      <span className="card-empty-msg">
        내 크루 현황을 불러오는 중입니다...
      </span>
    );
  }

  // 3. 로그인은 했으나 가입한 크루가 하나도 없는 경우 (기존 UI 감성 유지)
  if (!myCrew) {
    return (
      <span className="card-empty-msg">
        현재 참여 중인 러닝 크루가 없습니다.
      </span>
    );
  }

  // 4. 참여 중인 크루 데이터가 존재할 경우 매핑 출력
  return (
    <div className="main-crew-card-item">
      <span className="crew-level-tag Mycrew-tag">{myCrew.level}</span>
      <div className="crew-text-summary">
        <h4>{myCrew.title}</h4>
        <p>
          {myCrew.schedule} {myCrew.distance && `• ${myCrew.distance}`}
        </p>
      </div>
    </div>
  );
};

export default MainMyCrewCard;
