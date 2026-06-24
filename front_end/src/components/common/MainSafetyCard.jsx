import React, { useState, useEffect } from "react";
import api from "../../js/api.js";

const MainSafetyCard = () => {
  const [latestAlert, setLatestAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestAlert = async () => {
      try {
        const response = await api.get("/api/emergency_alert", {
          params: { pageNo: 1, numOfRows: 10 },
        });

        const responseData = response.data;
        const alertList =
          responseData?.rtnResultData ||
          responseData?.data ||
          responseData?.body ||
          [];

        // 1. "기타" 데이터 원천 차단 필터링
        const filteredList = alertList.filter((item) => {
          const typeName = item.dstSeNm || item.DST_SE_NM || "";
          return typeName !== "기타";
        });

        // 2. 가장 상단의 최신 데이터 딱 1건만 추출하여 변환 매핑
        if (filteredList.length > 0) {
          const item = filteredList[0];
          const msgContent = item.msgCn || item.MSG_CN || "";

          // 긴급도 레벨 클래스 판별
          let level = "info";
          if (msgContent.includes("경보") || msgContent.includes("대피") || msgContent.includes("위험")) {
            level = "critical";
          } else if (msgContent.includes("주의보") || msgContent.includes("자제")) {
            level = "warn";
          }

          setLatestAlert({
            type: item.dstSeNm || item.DST_SE_NM || "안전안내",
            content: msgContent,
            time: item.crtDt || item.CRT_DT || "실시간",
            level: level,
          });
        }
      } catch (error) {
        console.error("메인 화면 재난 데이터 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAlert();
  }, []);

  if (loading) {
    return <span className="card-empty-msg">속보를 불러오는 중입니다...</span>;
  }

  if (!latestAlert) {
    return <span className="card-empty-msg">현재 발령된 안전 속보가 없습니다.</span>;
  }

  return (
    <div className={`main-crew-card-item alert-level-${latestAlert.level}`}>
      <span className="crew-level-tag alert-badge-style">{latestAlert.type}</span>
      <div className="crew-text-summary">
        <h4 className="alert-content-text">{latestAlert.content}</h4>
        <p>{latestAlert.time}</p>
      </div>
    </div>
  );
};

export default MainSafetyCard;