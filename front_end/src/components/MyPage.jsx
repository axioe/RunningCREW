import React, { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";
import Header from "./common/Header";
import MyPost from "./MyPage/MyPost";
import TabContent from "./MyPage/TabContent";
import useAuthStore from "./common/useAuthStore";
import api from "../js/api";
import axios from "axios";

const fetchUser = async () => {
  const userId = localStorage.getItem("userId");

  const res = await axios.get(
    `http://localhost:8080/user/getUser?user_id=${userId}`,
  );

  setUser(res.data);
};

const updateUser = async () => {
  await axios.put(`http://localhost:8080/user/${user.id}`, {
    userId: user.userId,
    email: user.email,
    nickName: user.nickName,
    userLevel: user.userLevel,
  });

  alert("회원 정보 수정 완료");
};

const changePassword = async () => {
  if (!newPassword) {
    alert("비밀번호 입력 필요");
    return;
  }

  await axios.post("http://localhost:8080/user/updatePassword", {
    id: user.id,
    password: newPassword,
  });

  alert("비밀번호 변경 완료");
  setNewPassword("");
};

const Page = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // 현재 활성화된 서브 메뉴 탭 상태 관리 ('profile', 'crew', 'bookmark', 'post')
  const [activeTab, setActiveTab] = useState("profile");

  // 임시 데이터 (기존 페이지 톤앤매너 매칭용)
  const [userProfile, setUserProfile] = useState({
    nickname: "러닝이",
    email: "runner@naturerunner.com",
    role: "소프트웨어 개발자",
    imageUrl: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleUpdateProfile = async () => {
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
        return;
      }
    }
    try {
      const updateData = {
        nickName: userProfile.nickname,
        ...(newPassword && { password: newPassword }),
      };

      // 📝 실제 서버와 연동 시 아래 주석을 해제하여 사용하세요.
      await api.put(`/user/${user.id}`, updateData);

      alert("회원 정보가 성공적으로 수정되었습니다.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("프로필 수정 에러:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  const getUser = async () => {
    try {
      const response = await api.get(`/user/${user.id}`);
      console.log(response.data);
      setUserProfile({
        nickname: response.data.nickName,
        email: response.data.email,
        role: response.data.userLevel,
        imageUrl: response.data.imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  let [crewPosts, setCrewPosts] = useState([]);
  //  내 러닝 크루 현황
  const getCrewPosts = async () => {
    try {
      const response = await api.get(`/post/getAllByUserId?userId=${user.id}`);
      //console.log(response.data);
      setCrewPosts(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getUser();
    getCrewPosts();
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (!userProfile.imageUrl) return;
        const response = await api.get("/images/download", {
          params: {
            file_name: userProfile.imageUrl,
          },
          responseType: "blob",
        });

        const blobUrl = URL.createObjectURL(response.data);
        //console.log("blobUrl : " + blobUrl);

        setImage(blobUrl);
      } catch (error) {
        console.error("이미지 다운로드 실패", error);
      }
    };
    loadImage();
  }, [userProfile]);

  return (
    <div className="nature-runner-main-wrapper nature-runner-mypage-wrapper">
      <Header />

      {/* 2. 메인 바디 (2단 분할 레이아웃) */}
      <div className="mypage-container">
        {/* [본문 좌측 섹션: 프로필 카드 & 서브 메뉴] */}
        <aside className="mypage-sidebar">
          <div className="sidebar-profile-card">
            {image ? (
              <div className="profile-area">
                <div className="profile-image">
                  <img src={image} alt="프로필" />
                </div>
              </div>
            ) : (
              <div className="profile-avatar">
                {/* 기본 아바타 아이콘 대체용 placeholder */}
                <div className="avatar-placeholder">🏃‍♂️</div>
              </div>
            )}
            <h3 className="profile-nickname">{userProfile.nickname}</h3>
            <span className="profile-role-tag">{userProfile.role}</span>
          </div>

          <nav className="sidebar-menu-list">
            <button
              className={`sidebar-menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              내 정보 관리
            </button>
            <button
              className={`sidebar-menu-item ${activeTab === "crew" ? "active" : ""}`}
              onClick={() => setActiveTab("crew")}
            >
              내 러닝 크루 현황
            </button>
            {/* <button
              className={`sidebar-menu-item ${activeTab === "bookmark" ? "active" : ""}`}
              onClick={() => setActiveTab("bookmark")}
            >
              북마크한 러닝 코스
            </button> */}
            <button
              className={`sidebar-menu-item ${activeTab === "post" ? "active" : ""}`}
              onClick={() => setActiveTab("post")}
            >
              내가 작성한 글
            </button>
          </nav>
        </aside>

        {/* [본문 우측 섹션: 메인 대시보드 콘텐츠] */}
        <main className="mypage-content-area">
          {/* 탭 1: 내 정보 관리 (프로필 수정 폼 + 통계 요약) */}
          {activeTab === "profile" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">내 정보 관리</h2>

              {/* 러닝 통계 요약 위젯 */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">이번 달 달린 거리</span>
                  <div className="stat-value">
                    42.5 <span className="stat-unit">km</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">이번 달 러닝 시간</span>
                  <div className="stat-value">4시간 18분</div>
                </div>
              </div>

              {/* 프로필 수정 폼 */}
              <div className="mypage-form-card">
                <div className="form-group">
                  <label>닉네임</label>
                  <input
                    type="text"
                    className="mypage-input"
                    value={userProfile.nickname}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        nickname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    className="mypage-input"
                    value={userProfile.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호 변경</label>
                  <input
                    type="password"
                    className="mypage-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새로운 비밀번호를 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호 확인</label>
                  <input
                    type="password"
                    className="mypage-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="다시 입력하세요."
                  />
                </div>
                <button
                  className="mypage-submit-btn"
                  onClick={handleUpdateProfile}
                >
                  정보 수정 완료
                </button>
              </div>
            </div>
          )}

          {/* 탭 2: 내 러닝 크루 현황 */}
          {activeTab === "crew" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">내 러닝 크루 현황</h2>

              <div className="crew-list-container">
                <table className="crew-status-table">
                  <thead>
                    <tr>
                      <th>크루명</th>
                      <th>활동 지역</th>
                      <th>레벨</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crewPosts.map((post, index) => {
                      return (
                        <tr key={index}>
                          <td className="crew-name-cell">{post.title}</td>
                          <td>{post.spotName}</td>
                          <td>
                            <span className="crew-level-tag level-beginner">
                              {post.runningLevel === "HIGH"
                                ? "숲"
                                : post.runningLevel === "MEDIUM"
                                  ? "나무"
                                  : post.runningLevel === "LOW"
                                    ? "새싹"
                                    : ""}
                            </span>
                          </td>
                          <td>
                            <span className="status-badge badge-success">
                              {post.crewStatus === "PENDING"
                                ? "수락 대기 중"
                                : post.crewStatus === "APPROVED"
                                  ? "승인"
                                  : post.crewStatus === "CANCELLED"
                                    ? "취소"
                                    : ""}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 탭 3: 북마크한 러닝 코스 */}
          {activeTab === "bookmark" && (
            <div className="tab-content-wrapper">
              <h2 className="content-title">북마크한 러닝 코스</h2>
              <div className="bookmark-grid">
                {/* 예시 코스 카드 1 */}
                <div className="bookmark-course-card">
                  <div className="course-thumb-placeholder">🌲</div>
                  <div className="course-info">
                    <h4>양재천 메타세쿼이아 길 코스</h4>
                    <p>거리: 5.2km | 소요시간: 35분</p>
                  </div>
                </div>
                {/* 예시 코스 카드 2 */}
                <div className="bookmark-course-card">
                  <div className="course-thumb-placeholder">🌊</div>
                  <div className="course-info">
                    <h4>부산 광안리 해변 감성 코스</h4>
                    <p>거리: 3.8km | 소요시간: 25분</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 탭 4: 내가 작성한 글 */}
          {activeTab === "post" && <MyPost />}
        </main>
      </div>
    </div>
  );
};

export default Page;
