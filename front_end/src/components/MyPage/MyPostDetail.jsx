import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../js/api";
import useAuthStore from "../common/useAuthStore";
import "../../css/MyPost.css";

const STATUS_LABEL = {
  PENDING: "승인 대기중",
  APPROVED: "승인됨",
  CANCELLED: "거절됨",
};

const STATUS_CLASS = {
  PENDING: "status-pending",
  APPROVED: "status-approved",
  CANCELLED: "status-cancelled",
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [post, setPost] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. 상세 정보 및 신청자 목록 불러오기
  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`/member/getList?postId=${id}`);
      setPost(response.data);
    } catch (err) {
      console.error("데이터 로드 실패", err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!post) return <div className="empty-state">로딩중...</div>;

  // 2. 로그인한 사용자가 이 모집글의 방장인지 확인
  const myMembership = post.find((app) => app.userId === user?.id);
  const isOwner = myMembership?.crewRole === "Owner";

  // 3. 크루 참여하기 버튼 클릭 처리
  const handleJoinCrew = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (myMembership) {
      // 이미 신청했거나(대기/승인/거절 무관) 멤버 레코드가 있는 경우
      alert("이미 참여한 크루입니다.");
      return;
    }
    try {
      setActionLoading(true);
      const response = await api.post("/post/applied", {
        postId: Number(id),
        userId: user.id,
      });
      if (response.data?.success) {
        alert("신청이 완료되었습니다. 방장의 승인을 기다려주세요.");
        fetchData();
      } else {
        alert(response.data?.message || "이미 참여한 크루입니다.");
      }
    } catch (err) {
      console.error("크루 참여 신청 실패", err);
      alert("크루 참여 신청에 실패했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  // 4. 방장의 승인/거절 처리
  const handleApprove = async (memberId) => {
    if (!user) return;
    try {
      setActionLoading(true);
      await api.patch(`/member/${memberId}/approve`, null, {
        params: { requesterId: user.id },
      });
      fetchData();
    } catch (err) {
      console.error("승인 처리 실패", err);
      alert("승인 처리에 실패했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (memberId) => {
    if (!user) return;
    try {
      setActionLoading(true);
      await api.patch(`/member/${memberId}/reject`, null, {
        params: { requesterId: user.id },
      });
      fetchData();
    } catch (err) {
      console.error("거절 처리 실패", err);
      alert("거절 처리에 실패했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  // 5. 크루 참여 버튼 라벨/비활성 여부 결정 (방장은 버튼 자체를 숨김)
  const renderJoinButton = () => {
    if (isOwner) return null;

    if (myMembership) {
      const label =
        myMembership.crewStatus === "PENDING"
          ? "승인 대기중입니다."
          : myMembership.crewStatus === "APPROVED"
          ? "참여중인 크루입니다."
          : "거절된 신청입니다.";
      return (
        <button className="write-btn btn-join-crew" disabled>
          {label}
        </button>
      );
    }

    return (
      <button
        className="write-btn btn-join-crew"
        onClick={handleJoinCrew}
        disabled={actionLoading}
      >
        크루 참여하기
      </button>
    );
  };

  return (
    <div className="mypost-container detail-page-max-width">
      
      {/* 🌟 [구조 변경] 좌측 카드와 우측 정보 영역을 하나로 묶어주는 부모 레이아웃 */}
      <div className="detail-split-layout">
        
        {/* [좌측 구역] 러닝장소 카드 */}
        <div className="detail-left-gradient-card">
          <div className="card-content-wrap">
            <span className="location-badge">기존 러닝장소</span>
            <h1 className="location-main-title">
              {post[0]?.spotName || post[0]?.title}
            </h1>
            <p className="location-sub-address">
              {post[0]?.address || post[0]?.content}
            </p>
          </div>
        </div>

        {/* [우측 구역] 상세 정보 (기존에 닫혀있던 부모 태그 밖에서 안쪽으로 올바르게 위치 이동) */}
        <div className="detail-right-info-zone">
          <div className="top-info-content">
            <h3 className="mypost-title detail-section-title">상세 정보</h3>
            
            <div className="summary-card-flex-row">
              <div className="summary-mini-box">
                <span className="mini-box-label"> 난이도 </span>
                <strong className="mini-box-value">
                  {post[0]?.runningLevel
                    ? post[0].runningLevel === "HIGH"
                      ? "숲"
                      : post[0].runningLevel === "MEDIUM"
                      ? "나무"
                      : "새싹"
                    : "난이도 정보 없음"}
                </strong>
              </div>
              <div className="summary-mini-box">
                <span className="mini-box-label">시간</span>
                <strong className="mini-box-value">
                  {post[0]?.appliedAt
                    ? new Date(post[0].appliedAt).toLocaleString("ko-KR", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "시간 정보 없음"}
                </strong>
              </div>
            </div>

            <div className="introduction-section">
              <h5 className="intro-title"> 소개</h5>
              <div className="hashtag-row">
                <span className="hashtag-pill"> #태그정보 없음 </span>
              </div>
              <p className="intro-main-content">{post[0]?.content}</p>
            </div>
          </div>

          {/* 하단 버튼 그룹도 우측 영역 내부에 나란히 위치 */}
          <div className="detail-action-button-group">
            <button className="btn-back-to-list" onClick={() => navigate(-1)}>
              되돌아가기
            </button>
            {renderJoinButton()}
          </div>
        </div>

      </div> {/* 🌟 [구조 변경] 좌우 분할 영역 전체를 여기서 깔끔하게 닫아줍니다. */}

      <hr className="detail-divider" />

      {/* 신청자 관리 테이블 구역 - 방장만 노출 */}
      {isOwner && (
        <div className="applicant-management-box">
          <h3 className="mypost-title mb-3">신청자 관리</h3>
          <table className="table post-table">
            <thead>
              <tr>
                <th>닉네임</th>
                <th>상태</th>
                <th>신청일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {post
                .filter((app) => app.crewRole !== "Owner")
                .map((app) => (
                  <tr key={app.memberId}>
                    <td className="applicant-nickname">{app.nickName}</td>
                    <td>
                      <span
                        className={`status-badge ${STATUS_CLASS[app.crewStatus] ?? ""}`}
                      >
                        {STATUS_LABEL[app.crewStatus] ?? app.crewStatus}
                      </span>
                    </td>
                    <td className="applicant-date">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString("ko-KR")
                        : "-"}
                    </td>
                    <td>
                      {app.crewStatus === "PENDING" ? (
                        <div className="applicant-action-group">
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(app.memberId)}
                            disabled={actionLoading}
                          >
                            승인
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleReject(app.memberId)}
                            disabled={actionLoading}
                          >
                            거절
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted" style={{ fontSize: "13px" }}>
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              {post.filter((app) => app.crewRole !== "Owner").length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    아직 신청자가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}