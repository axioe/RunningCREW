import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import useAuthStore from "../common/useAuthStore";
import api from "../../js/api";

export default function MyPost() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // 📌 실제 DB에서 가져온 데이터를 담을 상태 관리
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //  내가 작성한 글
  const getCrewPostsOwner = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/post/getByUserId?userId=${user.id}`);
      //console.log(response.data);
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

  return (
    <div className="mt-3" style={{ width: "100%", paddingLeft: "20px" }}>
      {/* 상단 컨트롤 바 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5
          className="font-weight-bold m-0"
          style={{ color: "#111827", fontSize: "18px" }}
        >
          내가 작성한 모집글 리스트
        </h5>
        {/* 앞서 제작한 전용 글쓰기 폼 페이지(/write)로 라우팅 이동 연계 */}
        <Button
          variant="success"
          size="sm"
          style={{
            backgroundColor: "#10B981",
            borderColor: "#10B981",
            fontWeight: "600",
          }}
          onClick={() => navigate("/write")}
        >
          + 새 모집글 작성
        </Button>
      </div>

      {/* 로딩 중 가이드 */}
      {loading ? (
        <div className="text-center py-5 text-muted">
          데이터를 불러오는 중입니다...
        </div>
      ) : posts && posts.length > 0 ? (
        /* 데이터가 존재할 때: 세련된 테이블 리스트 포맷팅 */
        <Table hover responsive style={{ borderTop: "2px solid #10B981" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb", textAlign: "center" }}>
              <th style={{ width: "8%" }}>번호</th>
              <th>제목</th>
              <th style={{ width: "15%" }}>러닝 일정</th>
              <th style={{ width: "12%" }}>난이도</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((po, index) => (
              <tr
                key={po.id || index}
                style={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <td>{index + 1}</td>
                {/* 제목 부분만 좌측 정렬 및 링크 효과 */}
                <td
                  style={{
                    textAlign: "left",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  className="text-dark"
                >
                  {po.title}
                </td>
                <td className="text-muted" style={{ fontSize: "13px" }}>
                  {new Date(po.appliedAt).toLocaleDateString("ko-KR")}
                </td>
                <td>
                  <span
                    className={`badge ${
                      po.runningLevel === "LOW"
                        ? "bg-success"
                        : po.runningLevel === "MEDIUM"
                          ? "bg-primary"
                          : "bg-danger"
                    }`}
                    style={{ padding: "6px 10px", fontSize: "11px" }}
                  >
                    {po.runningLevel === "HIGH"
                      ? "숲"
                      : po.runningLevel === "MEDIUM"
                        ? "나무"
                        : po.runningLevel === "LOW"
                          ? "새싹"
                          : ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        /* 📌 데이터가 없을 때: 요청하신 예외 처리 디자인 구현 */
        <div
          className="text-center py-5 rounded"
          style={{
            border: "1px dashed #d1d5db",
            backgroundColor: "#f9fafb",
            color: "#6b7280",
            margin: "20px 0",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>📋</div>
          <p className="m-0" style={{ fontSize: "14px", fontWeight: "500" }}>
            등록된 리스트가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
