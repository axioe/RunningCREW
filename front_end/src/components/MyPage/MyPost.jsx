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

  return (
    <div className="mypost-container">
      <div className="mypost-header">
        <h5 className="mypost-title">내가 작성한 모집글 리스트</h5>
        <Button variant="success" size="sm" className="write-btn" onClick={() => navigate("/write")}>
          + 새 모집글 작성
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5 text-muted">데이터를 불러오는 중입니다...</div>
      ) : posts && posts.length > 0 ? (
        <Table hover responsive className="post-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>번호</th>
              <th>제목</th>
              <th style={{ width: "15%" }}>러닝 일정</th>
              <th style={{ width: "12%" }}>난이도</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((po, index) => (
              <tr key={po.id || index} className="post-row">
                <td>{index + 1}</td>
                <td className="post-title-cell" onClick={() => navigate(`/post/${po.id}`)}>
                  {po.title}
                </td>
                <td className="text-muted" style={{ fontSize: "13px" }}>
                  {new Date(po.appliedAt).toLocaleDateString("ko-KR")}
                </td>
                <td>
                  <span className={`badge ${po.runningLevel === "LOW" ? "bg-success" : po.runningLevel === "MEDIUM" ? "bg-primary" : "bg-danger"}`}>
                    {po.runningLevel === "HIGH" ? "숲" : po.runningLevel === "MEDIUM" ? "나무" : "새싹"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: "24px" }}>📋</div>
          <p>등록된 리스트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}