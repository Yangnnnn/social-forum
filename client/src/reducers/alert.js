import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

const al = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((s) => s.id !== action.payload);
    default:
      return state;
  }
};
