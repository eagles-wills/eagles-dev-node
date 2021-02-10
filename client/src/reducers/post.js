import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POST_ID,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "../actions/types";

const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const post = (state = initState, { type, payload }) => {
  switch (type) {
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case GET_POST:
      return { ...state, posts: payload, loading: false };
    case GET_POST_ID:
      return { ...state, post: payload, loading: false };
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts], loading: false };
    case UPDATE_LIKES:
      console.log(state.posts);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, post: payload.likes } : post
        ),
        loading: false,
      };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, post: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post.comments.filter((comment) => comment._id !== payload),
        },
        loading: false,
      };

    default:
      return state;
  }
};

export default post;
