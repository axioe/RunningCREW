import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function MyPost({ post, addPost }) {
  const [showPostForm, setShowPostForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmitPost = () => {
    if (newTitle.trim() == "" || newContent.trim() == "") {
      alert("제목과 내용은 반드시 입력하셔야 합니다.");
      return;
    }
    const newPost = {
      title: newTitle,
      post: newContent,
    };

    addPost(newPost);

    setNewTitle("");
    setNewContent("");
    setShowPostForm(false);
    alert("글이 등록되었습니다.");
  };

  return (
    <div className="mt-3">
      <div className="mt-2">
        <Button
          variant="link"
          className="p-0 text-decoration-none"
          onClick={() => {
            setShowPostForm(!showPostForm);
          }}
        >
          {showPostForm ? "취소" : "글 작성하기"}
        </Button>
      </div>
      {showPostForm && (
        <div className="border p-3 mb-4 bg-light rounded">
          <Form>
            <Form.Control
              type="text"
              placeholder="글 제목"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mb-2"
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="글 내용"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" size="sm" onClick={handleSubmitPost}>
              등록
            </Button>
          </Form>
        </div>
      )}

      {post?.map((po, index) => {
        return (
          <div key={index} className="mb-4">
            <h6 className="f2-bold text-primary mb-2">{po.title}</h6>
            <p className="text-dark mb-3">{po.post}</p>
            <hr className="text-muted" />
          </div>
        );
      })}
    </div>
  );
}
