import { POSTS_SUCCESS, POSTS_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,

        posts: state.posts.map((post) =>
          post._id === payload.post_id
            ? { ...post, likes: payload.likes }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
