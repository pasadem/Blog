import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="containerCard">
      <Row>
        <h2>{post.title}</h2>
      </Row>
      <Row>
        <Col className="col-auto pb-3">{post.body}</Col>
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
          <Link to={`/post/edit/${post.id}`}><Button type="button" className="wns-btn mt-4">Edit Post
          </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default SinglePostPage;
