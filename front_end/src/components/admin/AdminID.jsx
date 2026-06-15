import React, { useState } from "react";

const AdminID = () => {
  const [admins, setAdmins] = useState([
    { id: 1, adminId: "admin_master", name: "최고 관리자", role: "총괄" },
    { id: 2, adminId: "admin_crew", name: "크루 매니저", role: "콘텐츠 관리" },
  ]);

  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          관리자 계정 관리 <span className="count-tag">{admins.length}</span>
        </h3>
        <button className="btn-admin-add" onClick={() => alert("관리자 추가 폼 오픈")}>
          관리자 등록
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>관리자 ID</th>
            <th>이름</th>
            <th>권한 등급</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>
                <strong>{admin.adminId}</strong>
              </td>
              <td>{admin.name}</td>
              <td>
                <span className="crew-level-tag">{admin.role}</span>
              </td>
              <td>
                <span style={{ color: "#10B981", fontWeight: "bold" }}>활성화</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminID;