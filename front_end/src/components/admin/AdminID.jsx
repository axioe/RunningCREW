import React, { useState, useEffect } from "react";
import api from "../../js/api";
import AdminRegist from "./AdminRegist";

const AdminID = () => {
  const [isRegistMode, setIsRegistMode] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌟 [수정] GET /admin/admins — 실제 관리자 목록 조회
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/admins");
      setAdmins(response.data || []);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🌟 [수정] PATCH /admin/users/{id}/role — 실제 권한 변경 API 연동
  const handleSaveAdmin = async (newAdminData) => {
    try {
      // 1. userId로 대상 유저 조회
      const userRes = await api.get(`/user/getUser?user_id=${newAdminData.userId}`);
      const targetUser = userRes.data;

      if (!targetUser?.id) {
        alert("존재하지 않는 사용자 ID입니다.");
        return;
      }

      // 2. 권한 변경 (ROLE_ADMIN → ADMIN, ROLE_USER → USER 로 변환)
      const roleValue = newAdminData.userRole === "ROLE_ADMIN" ? "ADMIN" : "USER";
      await api.patch(`/admin/users/${targetUser.id}/role?role=${roleValue}`);

      alert(`${newAdminData.userId} 사용자의 권한이 변경되었습니다.`);
      setIsRegistMode(false);
      fetchAdmins(); // 목록 새로고침
    } catch (error) {
      console.log("Error : ", error);
      alert("권한 변경에 실패했습니다. 사용자 ID를 다시 확인해주세요.");
    }
  };

  if (isRegistMode) {
    return (
      <AdminRegist
        onCancel={() => setIsRegistMode(false)}
        onSave={handleSaveAdmin}
      />
    );
  }

  if (loading)
    return <div className="admin-loading">관리자 정보를 불러오는 중...</div>;

  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          관리자 계정 관리 <span className="count-tag">{admins.length}</span>
        </h3>
        <button className="btn-admin-add" onClick={() => setIsRegistMode(true)}>
          관리자 등록
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>관리자 ID</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#94a3b8" }}>
                등록된 관리자가 없습니다.
              </td>
            </tr>
          ) : (
            admins.map((admin, idx) => (
              <tr key={admin.id}>
                <td>{idx + 1}</td>
                <td><strong>{admin.userId}</strong></td>
                <td>{admin.nickName}</td>
                <td>{admin.email}</td>
                <td>
                  <span style={{ color: "#10B981", fontWeight: "bold" }}>활성화</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminID;
