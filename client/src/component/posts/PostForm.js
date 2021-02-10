import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/postActions";
const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Please Say Something</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          value={text}
          cols="30"
          rows="5"
          placeholder="Create a Post"
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
