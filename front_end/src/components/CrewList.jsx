import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../js/api";
import useAuthStore from "./common/useAuthStore";
import FormatDate from "./common/FormatDate";

const CrewList = ({ currentItems, loading }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  // 유저가 참가하기를 누른 게시글의 ID를 저장하는 상태
  const [userJoinId, setUserJoinId] = useState([]);

  // 🌟 참가하기 버튼 클릭 핸들러
  const handleJoin = async (e, crewId) => {
    e.stopPropagation(); // 카드 클릭 이동 방지
    try {
      const res = await api.post("/post/applied", {
        postId: crewId,
        UserId: user.id,
      });

      setUserJoinId((prev) => [...prev, crewId]);
      alert("참가 신청이 완료되었습니다.");
    } catch (error) {
      console.error("참가 신청 실패:", error);
      alert("신청에 실패했습니다.");
    }
  };

  // 🌟 취소하기 버튼 클릭 핸들러
  const handleCancelJoin = async (crewId) => {
    if (!window.confirm("참가 신청을 취소하시겠습니까?")) return;
    try {
      //id => memberId
      const response = await api.delete(`/member/${id}`);
      setUserJoinId((prev) => prev.filter((id) => id !== crewId));
      alert("참가 신청이 취소되었습니다.");
    } catch (error) {
      console.error("취소 실패:", error);
      alert("취소 처리에 실패했습니다.");
    }
  };

  // 1. 로딩 상태 처리
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 0",
          color: "#16A34A",
          fontWeight: "bold",
        }}
      >
        <i className="fa-solid fa-spinner fa-spin"></i> 크루 데이터를 실시간으로
        조회 중입니다...
      </div>
    );
  }

  // 2. 데이터가 없을 때 처리
  if (
    !currentItems ||
    !Array.isArray(currentItems) ||
    currentItems.length === 0
  ) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 0",
          color: "#94a3b8",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        <i
          className="fa-solid fa-database"
          style={{
            display: "block",
            fontSize: "32px",
            marginBottom: "12px",
            color: "#cbd5e1",
          }}
        ></i>
        DB 데이터가 없습니다.
      </div>
    );
  }

  // 3. 목록 렌더링
  return (
    <div className="crw-list-items-stack">
      {currentItems.map((crew) => (
        <div
          key={crew.id}
          className="crw-list-row-item"
          onClick={() => navigate(`/post/${crew.id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="crw-list-row-img-placeholder">
            <i
              className="fa-solid fa-users"
              style={{ fontSize: "24px", color: "#94a3b8" }}
            ></i>
          </div>

          <div className="crw-list-row-details">
            <div className="title-row-line">
              <h5>{crew.title}</h5>
            </div>
            <div className="horizontal-spec-infos">
              <span>📅 일정: {FormatDate(crew.createdAt)}</span>
            </div>
            <p className="row-item-sub-caption">{crew.content}</p>
          </div>

          <div className="crw-list-row-right-status">
            <div className="ratio-number">
              정원{" "}
              <strong>
                {crew.currentPeople || 0} / {crew.maxPeople}
              </strong>
            </div>

            {/* 마감 상태 처리 */}
            {(crew.currentPeople || 0) >= crew.maxPeople &&
            !userJoinId.includes(crew.id) ? (
              <div className="crw-join-action-btn closed-status">마감</div>
            ) : (
              <div
                className="action-button-group"
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <button
                  className={`crw-join-action-btn ${userJoinId.includes(crew.id) ? "pending-status" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!userJoinId.includes(crew.id)) handleJoin(e, crew.id);
                  }}
                >
                  {userJoinId.includes(crew.id) ? "승인 대기 중" : "참가하기"}
                </button>

                {userJoinId.includes(crew.id) && (
                  <button
                    className="cancel-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelJoin(crew.memberId);
                    }}
                  >
                    취소하기
                  </button>
                )}
              </div>
            )}

            <div className="passed-time-stamp">
              {(crew.currentPeople || 0) >= crew.maxPeople
                ? "모집완료"
                : "모집중"}
            </div>
            <i className="fa-regular fa-bookmark row-bookmark-icon"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrewList;
