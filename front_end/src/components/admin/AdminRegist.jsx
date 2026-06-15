import React, { useState } from "react";
import "../../css/AdminRegist.css";

const AdminRegist = ({ onCancel, onSave }) => {
  // 💡 비밀번호, 체력 등급을 제외하고 권한 변경에 필요한 핵심 정보만 관리
  const [formData, setFormData] = useState({
    userId: "",       
    userRole: "ROLE_ADMIN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.userId.trim()) {
      alert("관리자로 지정할 사용자의 ID를 입력해주세요.");
      return;
    }
    
    if (onSave) {
      // 부모 컴포넌트(adminID.jsx)로 대상 ID와 변경할 권한 정보를 전달
      onSave(formData); 
    } else {
      alert(`권한 변경 요청:\n대상 ID: ${formData.userId}\n변경할 권한: ${formData.userRole}`);
    }
  };

  return (
    <div className="admin-card-inner">
      <div className="content-header">
        <h3>
          일반 사용자를 관리자로 지정 <span className="count-tag">↑</span>
        </h3>
      </div>

      <p className="admin-form-desc">
        기존에 가입된 일반 사용자의 아이디를 입력하여 관리자 권한을 부여합니다.<br/>
        대상 유저의 비밀번호와 체력 등급 등 개인정보는 그대로 유지됩니다.
      </p>

      <form onSubmit={handleSubmit} className="admin-form-container">
        
        {/* 1. 대상 사용자 ID 입력 */}
        <div className="form-group">
          <label className="form-label">대상 사용자 ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="관리자로 승격할 유저의 ID를 입력하세요"
            className="form-input"
          />
        </div>

        {/* 2. 부여할 권한 선택 (userRole) */}
        <div className="form-group margin-bottom-lg">
          <label className="form-label">부여할 권한 등급 (RoleType)</label>
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            className="form-select"
          >
            <option value="ROLE_ADMIN">관리자 (ROLE_ADMIN)</option>
            <option value="ROLE_USER">일반 사용자 (ROLE_USER)</option>
          </select>
        </div>

        {/* 하단 버튼 그룹 */}
        <div className="form-btn-group">
          <button type="button" onClick={onCancel} className="btn-cancel">
            취소
          </button>
          <button type="submit" className="btn-submit">
            관리자로 지정하기
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminRegist;