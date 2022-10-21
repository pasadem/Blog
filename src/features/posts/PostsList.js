import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { Col, Container, Row } from "react-bootstrap";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <Col className="col-lg-4 col-md-6 col-sm-12 col-12">
        <PostsExcerpt key={post.id} post={post} />
      </Col>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
  <Container>
    <Row>{content}</Row>
  </Container>
  )
};
export default PostsList;
