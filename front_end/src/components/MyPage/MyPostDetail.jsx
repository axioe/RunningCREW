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
        const response = await api.get(`/member/getList/postId=${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("데이터 로드 실패", err);
      }
    };
    fetchData();
  }, [id]);

  if (!post) return <div>로딩중...</div>;

  return (
    <div className="container mt-5">
      <h2>{post[0].title}</h2>
      <p>{post[0].content}</p>
      <hr />
      <h3>신청자 관리</h3>
      <table className="table">
        <thead>
          <tr>
            <th>닉네임</th>
            <th>상태</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {post &&
            post.map((app) => (
              <tr key={app.id}>
                <td>{app.nickName}</td>
                <td>{app.crewStatus}</td>
                <td>{app.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
