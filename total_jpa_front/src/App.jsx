import "./App.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
// [수정] 폼과 버튼 컴포넌트를 사용하기 위해 react-bootstrap에서 추가로 import 해왔습니다.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "./api";
import { useEffect, useState } from "react";

function App() {
  // 데이터 가져와서 사용할 state
  const [users, setUsers] = useState([]);

  // 현재 페이지 번호 스테이트
  const [page, setPage] = useState(0);

  // 전체 페이지 수를 저장 스테이트(페이징 번호)
  const [totalPages, setTotalPages] = useState(0);

  const [pageCount, setPageCount] = useState(10);

  function fetchUsers(){
        api
      .get(`/getPage?page=${page}&size=${pageCount}`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.content);
        // 전체 페이지 할당
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 처음 페이지가 로딩되면 DB에서 api 요청하기
  // localhost:8080/api
  useEffect(() => {
    fetchUsers()
  }, [page]); // page 값이 바뀔 때 마다 실행

  // 한 화면에 10개 페이지씩 보여주기 처리
  // 0 ~ 9 페이지 => 0 그룹 ( 1 .... 10)
  // 10 ~ 19 페이지 => 1그룹 (11 ... 20)
  // 마지막 그룹 : 마지막 페이지와 전체페이지 수 중 작은 값 선택
  const pageGroup = Math.floor(page / pageCount);
  const startPage = pageGroup * pageCount;
  const endPage = Math.min(startPage + pageCount, totalPages);
  console.log("pageGroup : ", pageCount);
  console.log("startPage : ", startPage);

  // 신규 데이터 추가용 작업
  const [form, setForm] = useState({
    name: "",
    gender: "Male",
    email: "",
    likeColor: "",
  });

  // 사용자 입력값을 form state에 저장
  // e : 각 컨트롤에 입력되거나 선택된 값
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    // [수정] 객체 내부에 변화된 name과 value를 올바르게 매핑하도록 자바스크립트 객체 문법을 수정했습니다.
    setForm({
      ...form,
      [name]: value,
    });
  }
// 사용자추가 단추 클릭 시 처리할 이벤트
//  async는 비동기....
async function handleSubmit(e){
  e.preventDefault(); //중간에 입력한 자료를 유지
  try{
    await api.post("/users",form)
    alert("사용자가 추가 되었습니다.")
    // form 스테이트 초기화
    setForm({
    name: "",
    gender: "Male",
    email: "",
    likeColor: "",
    });
    // 맨 앞에 페이지로 이동해서 화면에 뿌린다.
    setPage(0)
    // 페이지 로드 함수 호출
    fetchUsers()
  }catch(err){
console.log(err)
alert("사용자 추가 실패")
  }
}

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">User 목록</h1>
        <p className="text-secondary">
          Spring Boot + React + JPA Sample Project
        </p>
      </div>
      <Form onSubmit={handleSubmit} className="mb-5 border rounded p-4">
        <h4 className="mb-3">사용자 추가</h4>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>성별</Form.Label>
          <Form.Select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>좋아하는 색상</Form.Label>
          <Form.Control
            type="text"
            name="likeColor"
            value={form.likeColor}
            onChange={handleChange}
            placeholder="색상 입력"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          추가하기
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>email</th>
            <th>LikeColor</th>
            <th>생성일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.likeColor}</td>
                <td>{new Date(user.createdAt).toLocaleString("ko-KR")}</td>
                <td>{new Date(user.updatedAt).toLocaleString("ko-KR")}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* 페이지 네이션 시작 */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First
            // page = 0 이면 disabled = true
            disabled={page == 0}
            onClick={() => {
              if (page > 0) setPage(0);
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
                {/* 페이지 번호를 클릭하면 현재 index => page */}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={page == totalPages - 1}
            onClick={() => {
              if (page < totalPages - 1) setPage(page + 1);
            }}
          />
          <Pagination.Last
            disabled={page == totalPages - 1}
            onClick={() => {
              if (page < totalPages - 1) setPage(totalPages - 1);
            }}
          />
        </Pagination>
      </div>
      {/* 페이지 네이션 종료 */}
    </div>
  );
}

export default App;