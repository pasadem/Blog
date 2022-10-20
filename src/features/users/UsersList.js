import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";


const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <Row key={user.id}>
      <Link to={`/user/${user.id}`}>
        <button className="reactionButton">{user.name}</button>
      </Link>
    </Row>
  ));

  return (
    <Container>
      <Row>
        <h2>Users</h2>
      </Row>
      {renderedUsers}
    </Container>
  );
};

export default UsersList;
