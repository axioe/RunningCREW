import api from "../js/api";
import { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import "../css/CourseModal.css";
import { Search, X } from "lucide-react";

function CourseModal({ setOpen, onSelectCourse }) {
  const [spotName, setSpotName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageCount, setPageCount] = useState(4);

  const searchSpotName = async () => {
    if (spotName.length <= 0) return;
    setLoading(true);
    try {
      const response = await api.get("/running/getSpots", {
        params: {
          page: page,
          size: pageCount,
          spot_name: spotName,
        },
      });

      const responseData = response.data;
      //console.log(response.data);

      if (
        responseData &&
        responseData.content &&
        responseData.content.length > 0
      ) {
        setCourses(responseData.content);
        setTotalPage(responseData.totalPages || 0);
      }
    } catch (error) {
      console.error(error);
      setPage(0);
      setTotalPage(0);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    const course = courses.find((item) => item.id === selectedId);
    onSelectCourse(course);
  };

  useEffect(() => {
    searchSpotName();
  }, [page]);

  const pageGroup = Math.floor(page / pageCount);
  const startPage = pageGroup * pageCount;
  const endPage = Math.min(startPage + pageCount, totalPage);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>러닝코스 검색</h2>
          <button className="icon-btn" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="장소명 또는 코스명을 입력하세요"
              value={spotName}
              onChange={(e) => {
                setSpotName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchSpotName();
                }
              }}
            />
          </div>

          <button
            className="search-btn"
            onClick={(e) => {
              e.preventDefault();
              searchSpotName();
            }}
          >
            검색
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>장소명</th>
                <th>주소</th>
                <th>거리</th>
                <th>난이도</th>
              </tr>
            </thead>

            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                courses.map((item, index) => (
                  <tr
                    key={item.id}
                    className={selectedId === item.id ? "selected-row" : ""}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <td>{page * pageCount + (index + 1)}</td>
                    <td>{item.spotName}</td>
                    <td>{item.address}</td>
                    <td>{item.distance} km</td>
                    {/* <td>{item.runningLevel}</td> */}
                    <td>
                      <span className="highlight-text">
                        {item.runningLevel === "HIGH"
                          ? "숲"
                          : item.runningLevel === "MEDIUM"
                            ? "나무"
                            : item.runningLevel === "LOW"
                              ? "새싹"
                              : ""}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지 네이션 시작 */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              disabled={page < pageCount}
              onClick={() => {
                if (page > pageCount) setPage(page - pageCount);
              }}
            />
            <Pagination.Prev
              disabled={page == 0}
              onClick={() => {
                if (page > 0) setPage(page - 1);
              }}
            />
            {[...Array(endPage - startPage)].map((_, index) => {
              const pageNumber = startPage + index;
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={page == pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={page == totalPage - 1}
              onClick={() => {
                if (page < totalPage - 1) setPage(page + 1);
              }}
            />
            <Pagination.Last
              disabled={page >= totalPage - pageCount}
              onClick={() => {
                if (page < totalPage - pageCount) setPage(page + pageCount);
              }}
            />
          </Pagination>
        </div>
        {/* 페이지 네이션 종료 */}

        {/* Footer */}
        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => setOpen(false)}>
            닫기
          </button>
          <button className="select-btn" onClick={handleConfirm}>
            선택하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
