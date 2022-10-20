import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <Row key={user.id}>
      <Link to={`/post/${post.id}`}>
        <button className="reactionButton">{post.title}</button>
      </Link>
    </Row>
  ));

  return (
    <Container>
      <h2>{user?.name}</h2>
      {postTitles}
    </Container>
  );
};

export default UserPage;
