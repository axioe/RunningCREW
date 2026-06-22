import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./common/Header.jsx";
import "../css/PublicSafety.css";

const PublicSafety = () => {
  const [safetyAlerts, setSafetyAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ critical: 0, warn: 0, info: 0 });

  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        const response = await axios.get("/api/public_safety", {
          params: { pageNo: 1, numOfRows: 10 }
        });
        
        // 공공데이터 JSON 응답 포맷 매핑
        const responseData = response.data;
        // 프로젝트 DTO 필드에 맞추어 콘솔 확인 후 유연하게 대처할 수 있도록 처리
        const alertList = responseData?.rtnResultData || responseData?.data || responseData?.body || [];
        
        const normalizedAlerts = alertList.map((item, index) => {
          // 공공 API 원본 필드명
          // 프로젝트 DTO에서 변환한 이름이 있다면 그에 맞추어 아래 필드명을 수정
          const msgContent = item.msgCn || item.MSG_CN || "";
          
          // 긴급도 판별 로직
          let level = "INFO";
          if (msgContent.includes("경보") || msgContent.includes("대피") || msgContent.includes("위험")) {
            level = "CRITICAL";
          } else if (msgContent.includes("주의보") || msgContent.includes("자제")) {
            level = "WARN";
          }

          return {
            id: item.md101Sn || item.MD101_SN || index,
            type: item.dstSeNm || item.DST_SE_NM || "안전안내", // 재난구분명 (지진, 호우 등)
            title: item.dstSeNm || item.DST_SE_NM ? `${item.dstSeNm || item.DST_SE_NM} 상황 속보` : "재난안전 지침",
            content: msgContent,
            time: item.crtDt || item.CRT_DT || "실시간",
            level: level
          };
        });

        setSafetyAlerts(normalizedAlerts);

        // 상단 미니 요약판 개수 동적 계산
        const criticalCount = normalizedAlerts.filter(a => a.level === "CRITICAL").length;
        const warnCount = normalizedAlerts.filter(a => a.level === "WARN").length;
        const infoCount = normalizedAlerts.filter(a => a.level === "INFO").length;
        
        setSummary({ critical: criticalCount, warn: warnCount, info: infoCount });

      } catch (error) {
        console.error("재난 데이터를 불러오는데 실패했습니다.", error);

        // 데모 데이터
        const demoData = [
          { id: 1, type: "호우", title: "경기도 수원시 호우경보 발령", content: "상습 침수 구역 및 하천 주변 접근을 자제하시고 안전한 곳으로 대피하시기 바랍니다.", time: "방금 전", level: "CRITICAL" },
          { id: 2, type: "폭염", title: "전국 대부분 지역 폭염경보", content: "낮 시간대 야외 활동을 자제하시고 충분한 수분을 섭취하시기 바랍니다.", time: "10분 전", level: "WARN" },
          { id: 3, type: "지진", title: "재난대비 훈련 및 행동요령 안내", content: "지진 발생 시 탁자 아래로 들어가 몸을 보호하고 계단을 이용해 공터로 대피하세요.", time: "1시간 전", level: "INFO" },
        ];
        setSafetyAlerts(demoData);
        setSummary({ critical: 1, warn: 1, info: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyData();
  }, []);

  return (
    <div className="main-wrapper">
      <Header />

      <div className="safety-container">
        {/* 타이틀 섹션 */}
        <div className="safety-header">
          <h2>
            <i className="fa-solid fa-triangle-exclamation"></i> 실시간 재난안전 정보
          </h2>
          <p>국민재난안전포털의 데이터를 기반으로 한 실시간 속보 및 행동요령입니다.</p>
        </div>

        {/* 상단 미니 요약판 - 실시간 개수 반영 */}
        <div className="safety-summary">
          <div className="summary-card critical">
            <span className="summary-title">위험/경보</span>
            <span className="summary-count">{summary.critical}건</span>
          </div>
          <div className="summary-card warn">
            <span className="summary-title">주의보</span>
            <span className="summary-count">{summary.warn}건</span>
          </div>
          <div className="summary-card info">
            <span className="summary-title">일반 안내</span>
            <span className="summary-count">{summary.info}건</span>
          </div>
        </div>

        {/* 메인 리스트 영역 */}
        <div className="safety-content">
          <div className="section-title">
            <h3>실시간 안전 속보</h3>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              <i className="fa-solid fa-rotate"></i> 새로고침
            </button>
          </div>

          {loading ? (
            <div className="safety-loading">데이터를 불러오는 중입니다...</div>
          ) : (
            <div className="alert-list">
              {safetyAlerts.length > 0 ? (
                safetyAlerts.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.level.toLowerCase()}`}>
                    <div className="alert-badge">{alert.type}</div>
                    <div className="alert-info">
                      <h4 className="alert-title">{alert.title}</h4>
                      <p className="alert-text">{alert.content}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="safety-loading">현재 발령된 안전 속보가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicSafety;