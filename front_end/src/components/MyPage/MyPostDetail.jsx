import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../js/api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // 1. 상세 정보 및 신청자 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/post/detail/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("데이터 로드 실패", err);
      }
    };
    fetchData();
  }, [id]);

  // 2. 승인/거절 처리
  const handleStatus = async (applicationId, status) => {
    try {
      await api.put(`/post/apply/status`, { applicationId, status });
      alert("처리가 완료되었습니다.");
      // 데이터 새로고침 로직 (예: fetchData 호출)
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  };

  if (!post) return <div>로딩중...</div>;

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <hr />

      <h3>신청자 관리</h3>
      <table className="table">
        <thead>
          <tr>
            <th>닉네임</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {post.applicants && post.applicants.map((app) => (
            <tr key={app.id}>
              <td>{app.nickname}</td>
              <td>{app.status}</td>
              <td>
                {app.status === "PENDING" && (
                  <>
                    <button onClick={() => handleStatus(app.id, "APPROVED")} className="btn btn-success btn-sm me-2">수락</button>
                    <button onClick={() => handleStatus(app.id, "REJECTED")} className="btn btn-danger btn-sm">거절</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}