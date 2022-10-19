import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

const PostsExcerpt = ({ post }) => {
  return (
    <Container className="containerCard">
      <Row>
        <h2>{post.title}</h2>
      </Row>
      <Row>
        <Col className="col-auto pb-3 excerpt">{post.body.substring(0, 75)}...</Col>
      </Row>
      <Row className="postCredit">
        <Col className="col-auto pb-3">
          <PostAuthor userId={post.userId} />
        </Col>
        <Col className="col-auto pb-3">
          <TimeAgo timestamp={post.date} />
        </Col>
      </Row>
      <Row>
        <ReactionButtons post={post} />
      </Row>
      <Row>
        <Col>
          <Link to={`post/${post.id}`}><Button type="button" className="wns-btn mt-4">View Post
          </Button>
          </Link>
        </Col>
      </Row>
    </Container>
    
  );
};
export default PostsExcerpt;
