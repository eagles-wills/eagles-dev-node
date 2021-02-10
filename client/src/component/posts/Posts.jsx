import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostForm, PostItem, Spinner } from "..";
import { getPost } from "../../actions/postActions";

const Posts = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome To The Community
      </p>
      <PostForm />

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
