import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SignUp.css";
import Header from "../common/Header";
import api from "../../js/api";

const SignUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // 파일 인풋 창을 제어하기 위한 Ref
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  // 1. 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    email: "",
  });

  // 프로필 이미지 프리뷰 상태 관리
  const [imagePreview, setImagePreview] = useState(null);

  // 2. 비밀번호 가시성 상태 (눈 아이콘 토글)
  const [showPassword, setShowPassword] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 등록 버튼 클릭 시 숨겨진 file input 강제 클릭 트리거
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // 파일이 선택되었을 때 실행되는 핸들러 (실제 파일 객체 확보 및 프리뷰 생성)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("최대 5MB 이하의 파일만 업로드 가능합니다.");
        return;
      }

      // 이미지를 화면에 노출하기 위해 가상 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 회원가입 버튼 클릭 시
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    try {
      const data = await api
        .post("/join", {
          userId: formData.userId,
          password: formData.password,
          nickName: formData.nickName,
          email: formData.email,
        })
        .then((res) => res.data);

      console.log(data.id);
      console.log(file);

      if (file) {
        const formData = new FormData();
        formData.append("user_id", data.id);
        formData.append("file", file);
        try {
          const response = await api.post("/images", formData);
          console.log(response.data);
          //alert("업로드 성공");
        } catch (error) {
          console.error(error);
          alert("이미지 업로드 실패했습니다.");
        }
      }
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 가입 완료 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.log(error);
      alert("회원가입이 실패했습니다.");
    }
  };

  // 초기화 버튼 클릭 시
  const handleReset = () => {
    setFormData({
      userId: "",
      password: "",
      confirmPassword: "",
      nickName: "",
      email: "",
    });
    setFile(null);
    setImagePreview(null); // 이미지도 함께 초기화
    alert("초기화 되었습니다.");
  };

  return (
    <div className="nature-runner-signup-wrapper">
      <Header />

      {/* --- 회원가입 본문 섹션 --- */}
      <main className="signup-container">
        {/* 좌측: 브랜드 홍보 섹션 */}
        <section className="signup-visual-side">
          <div className="visual-box">
            <h1>
              함께 달리면
              <br />더 멀리 갈 수 있습니다.
            </h1>
            <p className="sub-desc">
              Nature Runner Crew와 함께
              <br />
              새로운 러닝 코스를 발견하고
              <br />
              다양한 러너들과 소통해 보세요.
            </p>

            <div className="feature-list">
              <div className="feature-card">
                <i className="fa-solid fa-users"></i>
                <div>
                  <strong>러닝 크루 활동</strong>
                  <p>다양한 크루들과 소통하며 함께 달려요</p>
                </div>
              </div>
              <div className="feature-card">
                <i className="fa-solid fa-map-location-dot"></i>
                <div>
                  <strong>새로운 코스 발견</strong>
                  <p>전국의 숨겨진 러닝 코스를 탐색해 보세요</p>
                </div>
              </div>
              <div className="feature-card">
                <i className="fa-solid fa-trophy"></i>
                <div>
                  <strong>기록을 습관으로</strong>
                  <p>성장하는 내 기록을 매일 확인해요</p>
                </div>
              </div>
            </div>

            <div className="stat-summary">
              <div className="stat-node">
                <strong>10,000+</strong>
                <br />
                누적 러너
              </div>
              <div className="stat-node">
                <strong>2,500+</strong>
                <br />
                러닝 코스
              </div>
              <div className="stat-node">
                <strong>1,200+</strong>
                <br />
                러닝 크루
              </div>
            </div>
          </div>
        </section>

        {/* 우측: 실제 회원가입 폼 섹션 */}
        <section className="signup-form-side">
          <div className="form-inner-card">
            <h2>회원가입</h2>
            <p className="form-intro">
              Running Crew와 함께 러닝을 시작해보세요.
            </p>

            {/* 프로필 이미지 업로드부 (기능 구체화) */}
            <div className="profile-upload-area">
              <div
                className="profile-circle"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="프로필 미리보기"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>

              {/* 실제 이미지 파일 선택 창 (숨김 처리) */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button
                type="button"
                className="img-upload-trigger"
                onClick={handleImageUploadClick}
              >
                이미지 등록
              </button>
              <p className="upload-guide">JPG, PNG / 최대 5MB</p>
            </div>

            {/* 입력 폼 */}
            <form className="signup-form-body" onSubmit={handleSignUp}>
              <div className="signup-input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="아이디 입력"
                  required
                />
              </div>

              <div className="signup-input-box password-box">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호 입력"
                  required
                />
                <button
                  type="button"
                  className="password-eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={
                      showPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                  ></i>
                </button>
              </div>

              <div className="signup-input-box">
                <i className="fa-solid fa-check-double"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  required
                />
              </div>

              <div className="signup-input-box">
                <i className="fa-solid fa-signature"></i>
                <input
                  type="text"
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  placeholder="닉네임(성함) 입력"
                  required
                />
              </div>

              <div className="signup-input-box">
                <i className="fa-solid fa-signature"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일 입력"
                  required
                />
              </div>

              <div className="signup-btn-group">
                <button type="submit" className="btn-signup-submit">
                  회원가입
                </button>
                <button
                  type="button"
                  className="btn-signup-reset"
                  onClick={handleReset}
                >
                  초기화
                </button>
              </div>
            </form>

            <div className="signup-footer-link">
              이미 계정이 있으신가요?{" "}
              <button type="button" onClick={() => navigate("/login")}>
                로그인
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
