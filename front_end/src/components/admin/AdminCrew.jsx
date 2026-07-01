import React, { useEffect, useState } from "react";
import api from "../../js/api";

const AdminCrews = () => {
  const [crews, setCrews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCrews = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/posts?page=${page}&size=10`);
      setCrews(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrews();
  }, [page]);

  // 🌟 [수정] 실제 DELETE /admin/posts/{id} API 연동
  const handleDeleteCrew = async (id) => {
    if (!window.confirm("해당 크루 모집글을 삭제하시겠습니까?\n연관된 신청자 데이터도 함께 삭제됩니다.")) return;
    try {
      const response = await api.delete(`/admin/posts/${id}`);
      if (response.data?.success) {
        setCrews(crews.filter((crew) => crew.id !== id));
        alert("모집글이 삭제되었습니다.");
      } else {
        alert(response.data?.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log("Error : ", error);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading)
    return <div className="admin-loading">크루 데이터를 불러오는 중...</div>;

  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          크루 모집글 관리 <span className="count-tag">{crews.length}</span>
        </h3>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>모집글 제목</th>
            <th>모집글 내용 요약</th>
            <th>작성자 ID</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {crews.map((crew) => (
            <tr key={crew.id}>
              <td>{crew.id}</td>
              <td className="text-left">
                <strong>{crew.title}</strong>
              </td>
              <td className="text-left">{crew.content}</td>
              <td>{crew.userId}</td>
              <td>
                <button
                  className="btn-table-delete"
                  onClick={() => handleDeleteCrew(crew.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-pagination" style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>이전</button>
        <span style={{ margin: "0 15px" }}>{page + 1} / {totalPages}</span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>다음</button>
      </div>
    </div>
  );
};

export default AdminCrews;
