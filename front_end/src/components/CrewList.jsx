import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../js/api";
import useAuthStore from "./common/useAuthStore";
import FormatDate from "./common/FormatDate";

const CrewList = ({ currentItems, loading }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // 내가 신청/가입한 모집글 현황 (postId -> { memberId, crewStatus, crewRole })
  // 🌟 [수정] 로컬 state 추측이 아니라, 서버의 실제 신청 내역(/post/getAllByUserId)을 진실 공급원으로 사용합니다.
  const [myApplications, setMyApplications] = useState({});
  const [actionLoadingId, setActionLoadingId] = useState(null);
  // 방장 프로필 이미지 (userId -> blobUrl)
  const [ownerImages, setOwnerImages] = useState({});

  // 내 신청 현황 불러오기
  const fetchMyApplications = useCallback(async () => {
    if (!user?.id) {
      setMyApplications({});
      return;
    }
    try {
      const res = await api.get(`/post/getAllByUserId?userId=${user.id}`);
      const map = {};
      (res.data || []).forEach((item) => {
        // item.id == 모집글(postId), item.memberId == crew_member.id
        map[item.id] = {
          memberId: item.memberId,   // CrewPostMemberResponse.memberId (m.id)
          crewStatus: item.crewStatus ?? item.status,  // 백엔드 필드명 혼용 방어
          crewRole: item.crewRole,
        };
      });
      setMyApplications(map);
    } catch (error) {
      console.error("내 신청 현황 조회 실패:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  // 방장 프로필 이미지 병렬 로드 (currentItems 변경 시)
  useEffect(() => {
    if (!currentItems || currentItems.length === 0) return;

    // 중복 userId 제거 후 병렬 요청
    const uniqueUserIds = [...new Set(currentItems.map((c) => c.userId).filter(Boolean))];

    uniqueUserIds.forEach(async (userId) => {
      // 이미 로드된 경우 스킵
      if (ownerImages[userId] !== undefined) return;
      try {
        // 1단계: /user/{userId} 로 imageUrl(storedFileName) 조회
        const userRes = await api.get(`/user/${userId}`);
        const storedFileName = userRes.data?.imageUrl;
        if (!storedFileName) {
          setOwnerImages((prev) => ({ ...prev, [userId]: null }));
          return;
        }
        // 2단계: /images/download 로 실제 이미지 blob 다운로드
        const imgRes = await api.get("/images/download", {
          params: { file_name: storedFileName },
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(imgRes.data);
        setOwnerImages((prev) => ({ ...prev, [userId]: blobUrl }));
      } catch {
        setOwnerImages((prev) => ({ ...prev, [userId]: null }));
      }
    });
  }, [currentItems]);

  // 🌟 참가하기 버튼 클릭 핸들러
  const handleJoin = async (e, crewId) => {
    e.stopPropagation(); // 카드 클릭 이동 방지

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 서버 기준으로 이미 신청한 기록이 있는지 먼저 확인 (중복 신청 차단)
    // 단, 거절(CANCELLED)된 기록은 재신청을 허용합니다.
    const existing = myApplications[crewId];
    if (existing && existing.crewStatus !== "CANCELLED") {
      alert("이미 참여한 크루입니다.");
      return;
    }

    try {
      setActionLoadingId(crewId);
      const res = await api.post("/post/applied", {
        postId: crewId,
        userId: user.id,
      });

      if (res.data?.success) {
        alert("참가 신청이 완료되었습니다. 방장의 승인을 기다려주세요.");
        fetchMyApplications();
      } else {
        // ALREADY_APPLIED, POST_NOT_FOUND 등 백엔드가 내려주는 메시지 그대로 노출
        alert(res.data?.message || "이미 참여한 크루입니다.");
        fetchMyApplications();
      }
    } catch (error) {
      console.error("참가 신청 실패:", error);
      alert("신청에 실패했습니다.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // 🌟 취소하기 버튼 클릭 핸들러
  const handleCancelJoin = async (e, crewId) => {
    e.stopPropagation();
    e.preventDefault();
    const myApp = myApplications[crewId];
    if (!myApp?.memberId) return;

    if (!window.confirm("참가 신청을 취소하시겠습니까?")) return;
    try {
      setActionLoadingId(crewId);
      await api.delete(`/member/${myApp.memberId}`);
      alert("참가 신청이 취소되었습니다.");
      fetchMyApplications();
    } catch (error) {
      console.error("취소 실패:", error);
      alert("취소 처리에 실패했습니다.");
    } finally {
      setActionLoadingId(null);
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
      {currentItems.map((crew) => {
        const myApp = myApplications[crew.id];
        const isOwner = myApp?.crewRole === "Owner";
        const isPending = myApp && myApp.crewStatus === "PENDING";
        const isApproved = myApp && myApp.crewStatus === "APPROVED" && !isOwner;
        const isCancelled = myApp && myApp.crewStatus === "CANCELLED";
        // 🔧 [수정] currentPeople → appliedCnt (백엔드 실제 필드명)
        const currentPeople = crew.appliedCnt || 0;
        const isOver = currentPeople > crew.maxPeople;
        const isFull = currentPeople >= crew.maxPeople && !myApp;
        const isActionLoading = actionLoadingId === crew.id;

        return (
          <div
            key={crew.id}
            className="crw-list-row-item"
            onClick={() => navigate(`/post/${crew.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="crw-list-row-img-placeholder">
              {ownerImages[crew.userId] ? (
                <img
                  src={ownerImages[crew.userId]}
                  alt="방장 프로필"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              ) : (
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "24px", color: "#94a3b8" }}
                ></i>
              )}
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
                <strong style={{ color: isOver ? "#DC2626" : undefined }}>
                  {currentPeople} / {crew.maxPeople}
                </strong>
              </div>

              {/* 정원 초과 배지 */}
              {isOver && (
                <div className="crw-join-action-btn over-status">
                  정원이 초과되었습니다
                </div>
              )}

              {/* 마감/버튼 영역 — 정원 초과가 아닐 때만 */}
              {!isOver && (
                <>
                  {isFull ? (
                    <div className="crw-join-action-btn closed-status">마감</div>
                  ) : isOwner ? (
                    <div className="crw-join-action-btn owner-status">
                      내가 만든 크루
                    </div>
                  ) : (
                    <div
                      className="action-button-group"
                      style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                    >
                      <button
                        className={`crw-join-action-btn ${isPending ? "pending-status" : ""}`}
                        onClick={(e) => {
                          if (!myApp || isCancelled) handleJoin(e, crew.id);
                          else e.stopPropagation();
                        }}
                        disabled={isActionLoading || (!!myApp && !isCancelled)}
                      >
                        {isPending
                          ? "승인 대기 중입니다."
                          : isApproved
                          ? "참여중인 크루입니다."
                          : isCancelled
                          ? "다시 참가 신청하기"
                          : "참가하기"}
                      </button>

                      {(isPending || isApproved) && (
                        <button
                          className="cancel-action-btn"
                          onClick={(e) => handleCancelJoin(e, crew.id)}
                          disabled={isActionLoading}
                        >
                          취소하기
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="passed-time-stamp">
                {isOver
                  ? "정원초과"
                  : currentPeople >= crew.maxPeople
                  ? "모집완료"
                  : "모집중"}
              </div>
              <i className="fa-regular fa-bookmark row-bookmark-icon"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CrewList;
