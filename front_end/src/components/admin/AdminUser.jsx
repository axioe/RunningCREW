import React, { useEffect, useState } from "react";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = (pageNumber) => {
    setLoading(true);
    // 버그 수정: 템플릿 리터럴 오타 및 백엔드 스펙 바인딩
    fetch(`http://localhost:8080/admin/users?page=${pageNumber}&size=10`)
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 응답에 문제가 있습니다.");
        return res.json();
      })
      .then((data) => {
        setUsers(data.content || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("User 로딩 에러:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDeleteUser = (id) => {
    if (window.confirm("해당 유저를 탈퇴 처리하시겠습니까?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  if (loading) return <div className="admin-loading">유저 정보를 불러오는 중...</div>;

  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          유저 관리 <span className="count-tag">{users.length}</span>
        </h3>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>아이디(username)</th>
            <th>이메일</th>
            <th>권한 등급</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td><span className="crew-level-tag">{user.role}</span></td>
              <td>
                <button className="btn-table-delete" onClick={() => handleDeleteUser(user.id)}>
                  추방
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 네비게이션 추가 */}
      <div className="admin-pagination" style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>이전</button>
        <span style={{ margin: "0 15px" }}>{page + 1} / {totalPages}</span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>다음</button>
      </div>
    </div>
  );
};

export default AdminUser;