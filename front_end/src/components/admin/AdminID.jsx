import React, { useState } from "react";
import AdminRegist from "./AdminRegist"; 

const AdminID = () => {
  // 💡 1. 등록 모드 켜고 끄는 상태(State) 추가
  const [isRegistMode, setIsRegistMode] = useState(false);

  const [admins, setAdmins] = useState([
    { id: 1, adminId: "admin_master", name: "최고 관리자", role: "총괄" },
    { id: 2, adminId: "admin_crew", name: "크루 매니저", role: "콘텐츠 관리" },
  ]);

  // 💡 2. AdminRegist에서 승격 완료 버튼을 눌렀을 때 실행될 핸들러
  const handleSaveAdmin = (newAdminData) => {
    const newAdmin = {
      id: admins.length + 1,
      adminId: newAdminData.userId, 
      name: "신규 관리자",           
      role: newAdminData.userRole === "ROLE_ADMIN" ? "콘텐츠 관리" : "일반 유저",
    };

    setAdmins([...admins, newAdmin]);
    setIsRegistMode(false); 
    alert(`${newAdminData.userId} 사용자가 관리자로 지정되었습니다.`);
  };

  // 💡 3. 조건부 렌더링: 등록 모드가 켜져 있으면 등록 폼 화면만 먼저 리턴
  if (isRegistMode) {
    return (
      <AdminRegist 
        onCancel={() => setIsRegistMode(false)} 
        onSave={handleSaveAdmin}               
      />
    );
  }

  // 💡 4. 등록 모드가 꺼져 있을 때 나오는 기본 테이블 화면
  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          관리자 계정 관리 <span className="count-tag">{admins.length}</span>
        </h3>
        {/* 이제 이 버튼을 누르면 에러 없이 상단의 isRegistMode가 true로 변합니다 */}
        <button className="btn-admin-add" onClick={() => setIsRegistMode(true)}>
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