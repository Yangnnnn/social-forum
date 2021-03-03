import {
  ALL_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  UPDATE_PROFILE,
  REPOS_SUCCESS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_SUCCESS:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        repos: [],
        profile: null,
        error: {},
      };
    case ALL_PROFILE:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
