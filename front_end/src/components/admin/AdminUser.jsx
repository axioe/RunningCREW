import React, { useEffect, useState } from "react";
import api from "../../js/api";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${page}&size=10`);
      //console.log(response.data);
      setUsers(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
      //console.log(response.data);
      setUsers(users.filter((user) => user.id !== id));
      alert("추방되었습니다.");
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDeleteUser = (id) => {
    if (window.confirm("해당 유저를 탈퇴 처리하시겠습니까?")) {
      deleteUser(id);
    }
  };

  if (loading)
    return <div className="admin-loading">유저 정보를 불러오는 중...</div>;

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
            <th>아이디</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>권한 등급</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userId}</td>
              <td>{user.nickName}</td>
              <td>{user.email}</td>
              <td>
                <span className="crew-level-tag">{user.userLevel}</span>
              </td>
              <td>
                <button
                  className="btn-table-delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  추방
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 네비게이션 추가 */}
      <div
        className="admin-pagination"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          이전
        </button>
        <span style={{ margin: "0 15px" }}>
          {page + 1} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminUser;
