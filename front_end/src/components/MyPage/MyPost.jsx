import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import useAuthStore from "../common/useAuthStore";
import api from "../../js/api";
import "../../css/MyPage.css";

export default function MyPost() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCrewPostsOwner = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/post/getByUserId?userId=${user.id}`);
      setPosts(response.data);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCrewPostsOwner();
  }, []);

  const handleDelete = async (e, postId) => {
    e.stopPropagation(); // 행 클릭(상세 이동) 방지

    if (
      !window.confirm(
        "이 모집글을 삭제하시겠습니까? 삭제하면 신청자 정보도 함께 사라집니다.",
      )
    )
      return;

    try {
      const response = await api.delete(`/post/${postId}`, {
        params: { requesterId: user.id },
      });
      if (response.data?.success) {
        alert("모집글이 삭제되었습니다.");
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      } else {
        alert(response.data?.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypost-container">
      <div className="mypost-header">
        <h5 className="mypost-title">내가 작성한 모집글 리스트</h5>
        <Button
          variant="success"
          size="sm"
          className="write-btn"
          onClick={() => navigate("/write")}
        >
          + 새 모집글 작성
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5 text-muted">
          데이터를 불러오는 중입니다...
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="crew-list-container">
          <table className="crew-status-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>번호</th>
                <th>제목</th>
                <th style={{ width: "18%" }}>러닝 일정</th>
                <th style={{ width: "12%" }}>레벨</th>
                <th style={{ width: "12%" }}>관리</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((po, index) => (
                <tr key={po.id}>
                  <td>{index + 1}</td>

                  <td
                    className="mypost-title-cell"
                    onClick={() => navigate(`/post/${po.id}`)}
                  >
                    {po.title}
                  </td>

                  <td>{new Date(po.appliedAt).toLocaleDateString("ko-KR")}</td>

                  <td>
                    <span
                      className={`crew-level-tag ${
                        po.runningLevel === "LOW"
                          ? "level-beginner"
                          : po.runningLevel === "MEDIUM"
                            ? "level-medium"
                            : "level-advanced"
                      }`}
                    >
                      {po.runningLevel === "HIGH"
                        ? "숲"
                        : po.runningLevel === "MEDIUM"
                          ? "나무"
                          : "새싹"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="mypost-delete-btn"
                      onClick={(e) => handleDelete(e, po.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: "24px" }}>📋</div>
          <p>등록된 리스트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
