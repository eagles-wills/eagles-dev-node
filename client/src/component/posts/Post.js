import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostById } from "../../actions/postActions";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import PostItem from "./PostItem";

const Post = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(match.params.id));
  }, [dispatch, match]);
  const posts = useSelector((state) => state.post);
  const { post, loading } = posts;
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-primary">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comment">
        {post.comments.map((comment) => (
          <CommentItem comment={comment} postId={post._id} key={comment._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
