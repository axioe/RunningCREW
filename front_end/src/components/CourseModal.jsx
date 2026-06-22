import api from "../js/api";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";

function CourseModal({ open, setOpen }) {
  const [spotName, setSpotName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const numOfRows = 4; // 한 페이지에 보여줄 코스 개수

  const searchSpotName = async () => {
    setLoading(true);
    try {
      const response = await api.get("/running/getSpots", {
        params: {
          page: currentPage,
          size: numOfRows,
          spot_name: spotName,
        },
      });

      const responseData = response.data;
      console.log(response.data);

      if (
        responseData &&
        responseData.content &&
        responseData.content.length > 0
      ) {
        const mappedData = responseData.content.map((item, index) => ({
          id: item.id,
          type: courseType,
          title: item.spotName, // 장소
          address: item.address || "주소 정보 없음", // 주소
          desc: item.facilityInfo,
          tag: "기존 장소",
          latitude: item.latitude,
          longitude: item.longitude,
          distance: item.distance,
          tagDetail: [item.facility_info || "시설 정보 없음"],
          descDetail: "",
          imageUrl: "",
        }));

        setCourses(mappedData);
        setTotalCount(responseData.totalElements || 0);
      } else {
        setCourses([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error(error);
      setCourses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${open ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{
        backgroundColor: open ? "rgba(0,0,0,0.5)" : "transparent",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        {/* header */}
        <div className="modal-content bg-white border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">러닝코스 검색</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="d-flex align-items-center gap-2">
              <input className="form-control" placeholder="장소명 검색" />
              <button
                className="btn btn-success"
                style={{
                  whiteSpace: "nowrap",
                }}
                onClick={() => searchSpotName()}
              >
                검색
              </button>
            </div>
            {/* 로딩 중 가이드 */}
            {loading ? (
              <div className="text-center py-5 text-muted">
                데이터를 불러오는 중입니다...
              </div>
            ) : (
              <Table
                hover
                responsive
                style={{ borderTop: "2px solid #10B981" }}
              >
                <thead>
                  <tr
                    style={{ backgroundColor: "#f9fafb", textAlign: "center" }}
                  >
                    <th style={{ width: "8%" }}>번호</th>
                    <th>제목</th>
                    <th style={{ width: "15%" }}>장소명</th>
                    <th style={{ width: "15%" }}>주소</th>
                    <th style={{ width: "10%" }}>거리</th>
                    <th style={{ width: "10%" }}>난이도</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((po, index) => (
                    <tr
                      key={po.id || index}
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      <td>{index + 1}</td>
                      {/* 제목 부분만 좌측 정렬 및 링크 효과 */}
                      <td
                        style={{
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        className="text-dark"
                      >
                        {po.spotName}
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        className="text-dark"
                      >
                        {po.address}
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        className="text-dark"
                      >
                        {po.distance}
                      </td>
                      <td className="text-muted" style={{ fontSize: "13px" }}>
                        {new Date(po.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            po.runningLevel === "LOW"
                              ? "bg-success"
                              : po.runningLevel === "MEDIUM"
                                ? "bg-primary"
                                : "bg-danger"
                          }`}
                          style={{ padding: "6px 10px", fontSize: "11px" }}
                        >
                          {po.runningLevel === "HIGH"
                            ? "숲"
                            : po.runningLevel === "MEDIUM"
                              ? "나무"
                              : po.runningLevel === "LOW"
                                ? "새싹"
                                : ""}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {/* footer */}
            <div className="modal-footer border-0">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>

              <button className="btn btn-success">선택</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
