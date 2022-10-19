import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "../postsSlice";
import { selectAllUsers } from "../../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="postTitle">Post Title:</Form.Label>
          <Form.Control
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="postAuthor">Author:</Form.Label>
          <Form.Select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value=""></option>
            {usersOptions}
          </Form.Select>
          <Form.Label htmlFor="postContent">Content:</Form.Label>
        </Form.Group>
        <Form.Group>
        <Form.Control className="mb-3"
          as="textarea"
          rows={3}
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        </Form.Group>
        <Button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </Button>
      </Form>
    </section>
  );
};
export default AddPostForm;
