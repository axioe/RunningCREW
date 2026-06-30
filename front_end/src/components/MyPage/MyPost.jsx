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
    <div className="tab-content-wrapper">
      <div className="mypost-header">
        <h2 className="content-title">내가 작성한 글</h2>

        <button
          className="mypage-submit-btn"
          style={{ width: "160px", margin: 0 }}
          onClick={() => navigate("/write")}
        >
          + 새 모집글 작성
        </button>
      </div>

      {loading ? (
        <div className="empty-state">데이터를 불러오는 중입니다...</div>
      ) : posts.length > 0 ? (
        <div className="crew-list-container">
          <table className="crew-status-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>러닝 일정</th>
                <th>레벨</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((po, index) => (
                <tr key={po.id}>
                  <td>{index + 1}</td>

                  <td
                    className="crew-name-cell"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/post/detail/${po.id}`)}
                  >
                    {po.title}
                  </td>

                  <td>{new Date(po.appliedAt).toLocaleDateString("ko-KR")}</td>

                  <td>
                    <span
                      className={`crew-level-tag ${
                        po.runningLevel === "HIGH"
                          ? "level-advanced"
                          : po.runningLevel === "MEDIUM"
                            ? "level-medium"
                            : "level-beginner"
                      }`}
                    >
                      {po.runningLevel === "HIGH"
                        ? "숲"
                        : po.runningLevel === "MEDIUM"
                          ? "나무"
                          : "새싹"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>등록된 모집글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
