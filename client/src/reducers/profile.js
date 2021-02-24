import {
  CLEAR_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
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
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
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
    default:
      return state;
  }
}
