import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

export default function MyPost() {
  const navigate = useNavigate();
  
  // 📌 실제 DB에서 가져온 데이터를 담을 상태 관리
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 컴포넌트 마운트 시 백엔드 API로부터 내가 작성한 글 목록 로드
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        // TODO: 실제 백엔드 엔드포인트 URI로 변경하세요. (예: "/api/posts/my")
        // const response = await axios.get("/api/posts/my");
        // setPosts(response.data);
        
        // [테스트용 임시 더미 데이터 세팅] - DB 연동 시 이 선언부는 지우시면 됩니다.
        const dummyData = [
          { id: 1, title: "이번 주말 광교호수공원 야간 러닝 크루 모집합니다!", date: "2026-06-14", difficulty: "나무" },
          { id: 2, title: "초보자를 위한 탄천 5km 가볍게 뛰기", date: "2026-06-18", difficulty: "새싹" }
        ];
        setPosts(dummyData); 
        
        // 만약 데이터가 없는 상태를 테스트하고 싶다면 아래 주석을 해제하세요.
        // setPosts([]); 

      } catch (error) {
        console.error("내가 작성한 글을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="mt-3" style={{ width: "100%", paddingLeft: "20px" }}>
      
      {/* 상단 컨트롤 바 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="font-weight-bold m-0" style={{ color: "#111827", fontSize: "18px" }}>
          내가 작성한 모집글 리스트
        </h5>
        {/* 앞서 제작한 전용 글쓰기 폼 페이지(/write)로 라우팅 이동 연계 */}
        <Button 
          variant="success" 
          size="sm"
          style={{ backgroundColor: "#10B981", borderColor: "#10B981", fontWeight: "600" }}
          onClick={() => navigate("/write")}
        >
          + 새 모집글 작성
        </Button>
      </div>

      {/* 로딩 중 가이드 */}
      {loading ? (
        <div className="text-center py-5 text-muted">데이터를 불러오는 중입니다...</div>
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
              <tr key={po.id || index} style={{ verticalAlign: "middle", textAlign: "center" }}>
                <td>{index + 1}</td>
                {/* 제목 부분만 좌측 정렬 및 링크 효과 */}
                <td style={{ textAlign: "left", cursor: "pointer", fontWeight: "500" }} className="text-dark">
                  {po.title}
                </td>
                <td className="text-muted" style={{ fontSize: "13px" }}>{po.date}</td>
                <td>
                  <span 
                    className={`badge ${
                      po.difficulty === "새싹" ? "bg-success" : po.difficulty === "나무" ? "bg-primary" : "bg-danger"
                    }`}
                    style={{ padding: "6px 10px", fontSize: "11px" }}
                  >
                    {po.difficulty}
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
            margin: "20px 0"
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